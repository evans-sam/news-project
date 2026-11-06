import {
  Article,
  ArticleResponse,
  databaseClient,
  Insert,
  newArticleRequestSchema,
  NewsArticle,
  NewsClient,
  NewsResponse,
} from 'clients';
import { NextApiRequest, NextApiResponse } from 'next';
import { every, filter, join, kebabCase, map, pipe, take, uniqBy, words } from 'lodash/fp';

const API_KEY = process.env.NEWS_API_KEY;
const DB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const validated = newArticleRequestSchema.safeParse(body);
  if (validated.success === false) {
    res.status(400).json({ status: 'error', code: 'parameterInvalid', message: validated.error });
    return;
  }
  const { data } = validated;
  const newsClient = new NewsClient(API_KEY);
  const response: NewsResponse<ArticleResponse> = (await {
    'top-headlines': () => newsClient.topHeadlines(data),
    everything: () => newsClient.everything(data),
  }[data.route]?.()) ?? {
    status: 'error',
    code: 'parameterInvalid',
    message: `Please provide a valid route.  ${data.route}`,
  };

  if (response.status === 'error') {
    res.status(400).json(response);
    return;
  }

  const slugify = (title: string) =>
    pipe(
      words,
      filter((word) => word.length > 3),
      take(3),
      join('-'),
      kebabCase
    )(title) as string;
  const toDbArticle = ({ author, title, description, urlToImage, content }: NewsArticle): Insert<Article> => ({
    slug: slugify(title),
    title,
    author,
    content,
    excerpt: description,
    image: urlToImage,
  });

  const { articles } = response;
  const uniqArticles = pipe(filter(every(Boolean)), map(toDbArticle), uniqBy('slug'))(articles) as Insert<Article>[];
  const slugs = map('slug')(uniqArticles);

  const dbResponse = await databaseClient(DB_URL, SERVICE_ROLE_KEY).from('articles').insert(uniqArticles);

  if (dbResponse.status === 201) {
    await Promise.all(
      slugs.map((slug) => {
        return res.revalidate(`/${slug}`);
      })
    );
    res.status(201).json(uniqArticles);
    return;
  }

  res.status(dbResponse.status).json(dbResponse);
  return;
}

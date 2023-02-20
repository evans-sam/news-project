import { ArticleResponse, newArticleRequestSchema, NewsClient, NewsResponse, SourcesResponse } from 'clients';
import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NEWS_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const validated = newArticleRequestSchema.safeParse(body);
  if (validated.success === false) {
    res.status(400).json({ status: 'error', code: 'parameterInvalid', message: validated.error });
    return;
  } else {
    const { data } = validated;
    const newsClient = new NewsClient(API_KEY);
    const response: NewsResponse<ArticleResponse | SourcesResponse> = await {
      'top-headlines': () => newsClient.topHeadlines(data),
      everything: () => newsClient.everything(data),
      sources: () => newsClient.sources(data),
    }[data.route]();

    //TODO
    res.status(200).json(response);
  }
}

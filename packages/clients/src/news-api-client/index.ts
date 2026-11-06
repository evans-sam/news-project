import type {
  ArticleResponse,
  EverythingRequest,
  HeadlinesRequest,
  NewsEndpoint,
  NewsResponse,
  SourcesResponse,
} from './types';
import { SourcesRequest } from './types';

export * from './types';
export * from './validation-types';

const BASE_URL = 'https://newsapi.org';

export type NewArticleRequest =
  | ({ route: 'top-headlines' } & HeadlinesRequest)
  | ({ route: 'everything' } & EverythingRequest)
  | ({ route: 'sources' } & SourcesRequest);

export class NewsClient {
  private readonly apiKey: string;
  private readonly defaultHeaders: HeadersInit;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.defaultHeaders = new Headers({
      'user-agent': 'News-API-TS',
      'x-api-key': apiKey,
    });
  }

  async query<Req extends NewArticleRequest & ({ route: 'top-headlines' } | { route: 'everything' })>(
    request: Req
  ): Promise<NewsResponse<ArticleResponse>>;
  async query<Req extends NewArticleRequest & { route: 'sources' }>(
    request: Req
  ): Promise<NewsResponse<SourcesResponse>>;
  async query(request: NewArticleRequest): Promise<NewsResponse<ArticleResponse | SourcesResponse>> {
    const { route, ...params } = request;
    const url = this.getURL(route, params);
    return this.request(url);
  }

  async topHeadlines(params: HeadlinesRequest): Promise<NewsResponse<ArticleResponse>> {
    return this.query({ route: 'top-headlines', ...params });
  }

  async everything(params: EverythingRequest): Promise<NewsResponse<ArticleResponse>> {
    return this.query({ route: 'everything', ...params });
  }

  async sources(params: EverythingRequest): Promise<NewsResponse<SourcesResponse>> {
    return this.query({ route: 'sources', ...params });
  }

  private getURL(endpoint: NewsEndpoint, params: any) {
    const url = new URL(`v2/${endpoint}`, BASE_URL);
    const queryParams = this.getParams(params);
    url.search = queryParams.toString();
    return url;
  }

  private getParams({ q, searchIn, sources, domains, excludeDomains, from, to, ...params }: EverythingRequest) {
    const rest: Record<string, string> = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value?.toString() ?? ''])
    );

    return new URLSearchParams({
      q: q ?? '',
      searchIn: searchIn?.join(',') ?? '',
      sources: sources?.join(',') ?? '',
      domains: domains?.join(',') ?? '',
      excludeDomains: excludeDomains?.join(',') ?? '',
      from: from?.toISOString() ?? '',
      to: to?.toISOString() ?? '',
      ...rest,
    });
  }

  private async request(url: URL | string) {
    try {
      const response = await fetch(url, {
        headers: this.defaultHeaders,
      });
      if (!response.ok) {
        throw new Error(await response.json());
      } else {
        return response.json();
      }
    } catch (error) {
      throw new NewsClientError(error);
    }
  }
}

class NewsClientError extends Error {
  constructor(args: any) {
    super();
    Object.assign(this, args);
  }
}

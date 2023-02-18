import type { ArticleResponse, EverythingRequest, HeadlinesRequest, NewsResponse, SourcesResponse } from './types';

const BASE_URL = 'https://newsapi.org';

export default class NewsClient {
  private readonly apiKey: string;
  private readonly defaultHeaders: HeadersInit;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.defaultHeaders = new Headers({
      'user-agent': 'News-API-TS',
      'x-api-key': apiKey,
    });
  }

  async topHeadlines(params: HeadlinesRequest): Promise<NewsResponse<ArticleResponse>> {
    const url = this.getURL('/v2/top-headlines', params);
    return this.query(url);
  }

  async everything(params: EverythingRequest): Promise<NewsResponse<ArticleResponse>> {
    const url = this.getURL('/v2/everything', params);
    return this.query(url);
  }

  async sources(params: EverythingRequest): Promise<NewsResponse<SourcesResponse>> {
    const url = this.getURL('/v2/sources', params);
    return this.query(url);
  }

  private getURL(endpoint: string, params: any) {
    const url = new URL(endpoint, BASE_URL);
    const queryParams = this.getParams(params);
    url.search = queryParams.toString();
    return url;
  }

  private getParams({ q, searchIn, sources, domains, excludeDomains, from, to, ...params }: EverythingRequest) {
    const rest: Record<string, string> = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value?.toString() ?? ''])
    );

    return new URLSearchParams({
      q,
      searchIn: searchIn?.join(',') ?? '',
      sources: sources?.join(',') ?? '',
      domains: domains?.join(',') ?? '',
      excludeDomains: excludeDomains?.join(',') ?? '',
      from: from?.toISOString() ?? '',
      to: to?.toISOString() ?? '',
      ...rest,
    });
  }

  private async query(url: URL | string) {
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

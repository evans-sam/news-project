export type NewArticleRequest =
  | ({ route: 'top-headlines' } & HeadlinesRequest)
  | ({ route: 'everything' } & EverythingRequest)
  | ({ route: 'sources' } & SourcesRequest);

export type NewsEndpoint = 'top-headlines' | 'everything' | 'sources';

export type NewsRequest = {
  q?: string;
  pageSize?: number;
  page?: number;
};

export type NewsResponse<K> = K | ErrorResponse;

export type EverythingRequest = NewsRequest & {
  searchIn?: SearchIn[];
  sources?: string[];
  domains?: string[];
  excludeDomains?: string[];
  from?: Date;
  to?: Date;
  language?: Language;
  sortBy?: SortBy;
};

export type HeadlinesRequest = NewsRequest & {
  category?: Category;
} & ({ country: Country } | { sources: string[] } | {});

export type SourcesRequest = {
  category?: Category;
  language?: Language;
  country?: Country;
};

export type ArticleResponse = {
  status: 'ok';
  totalResults: number;
  articles: NewsArticle[];
};

export type SourcesResponse = {
  status: 'ok';
  sources: Source[];
};

export type ErrorResponse = {
  status: 'error';
  code: ErrorCode;
  message: string;
};

export type NewsArticle = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt?: Date;
  content: string;
};

export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
export type Country =
  | 'ae'
  | 'ar'
  | 'at'
  | 'au'
  | 'be'
  | 'bg'
  | 'br'
  | 'ca'
  | 'ch'
  | 'cn'
  | 'co'
  | 'cu'
  | 'cz'
  | 'de'
  | 'eg'
  | 'fr'
  | 'gb'
  | 'gr'
  | 'hk'
  | 'hu'
  | 'id'
  | 'ie'
  | 'il'
  | 'in'
  | 'it'
  | 'jp'
  | 'kr'
  | 'lt'
  | 'lv'
  | 'ma'
  | 'mx'
  | 'my'
  | 'ng'
  | 'nl'
  | 'no'
  | 'nz'
  | 'ph'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'rs'
  | 'ru'
  | 'sa'
  | 'se'
  | 'sg'
  | 'si'
  | 'sk'
  | 'th'
  | 'tr'
  | 'tw'
  | 'ua'
  | 'us'
  | 've'
  | 'za';
export type ErrorCode =
  | 'apiKeyDisabled'
  | 'apiKeyExhausted'
  | 'apiKeyInvalid'
  | 'parameterInvalid'
  | 'parameterMissing'
  | 'rateLimited'
  | 'sourcesTooMany'
  | 'sourceDoesNotExist'
  | 'unexpectedError';
export type SearchIn = 'title' | 'content' | 'description';
export type Language = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'se' | 'ud' | 'zh';
export type SortBy = 'relevancy' | 'popularity' | 'publishedAt';
export type Source = {
  id: string;
  name: string;
} & (
  | {
      description: string;
      url: string;
      category: Category;
      language: Language;
      country: Country;
    }
  | {}
);

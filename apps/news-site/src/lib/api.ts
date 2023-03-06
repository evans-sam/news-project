import { Article, databaseClient, Row } from 'clients';

const DB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPostSlugs() {
  const { data, error } = await databaseClient(DB_URL, DB_KEY).from('articles').select('slug');
  if (!data?.length || error) return [];

  return data as unknown as Pick<Row<Article>, 'slug'>[];
}

export async function getPostBySlug<Keys extends keyof Row<Article>>(slug: string, fields: Keys[] = []) {
  const { data, error } = await databaseClient(DB_URL, DB_KEY)
    .from('articles')
    .select(fields.length ? fields.join(', ') : '*')
    .eq('slug', slug)
    .single();

  if (!data || error) return null;

  return data as unknown as Pick<Row<Article>, Keys>;
}

export async function getAllPosts<Keys extends keyof Row<Article>>(fields: Keys[] = []) {
  const { data, error } = await databaseClient(DB_URL, DB_KEY)
    .from('articles')
    .select(fields.length ? fields.join(', ') : '*')
    .order('created_at', { ascending: false });

  if (!data?.length || error) return [];

  return data as unknown as Pick<Row<Article>, Keys>[];
}

import {
  databaseClient,
  ResolveArrayResponse,
  ResolveRelationQuery,
  ResolveResponse,
} from "clients";

const DB_URL = process.env.SUPABASE_URL;
const DB_KEY = process.env.SUPABASE_KEY;

export async function getPostSlugs() {
  const articlesSlug = "articles(slug)";
  type Articles = ResolveRelationQuery<typeof articlesSlug, "one">;

  const { data, error } = await databaseClient(DB_URL, DB_KEY)
    .from("articles")
    .select("slug");
  if (!data?.length || error) return [];
  type PostSlugsResponse = ResolveArrayResponse<typeof data, Articles>;

  return data as PostSlugsResponse;
}

export async function getPostBySlug(slug: string, fields = []) {
  const article = `articles(${fields.join(", ")}`;
  type Articles = ResolveRelationQuery<typeof article, "one">;

  const { data, error } = await databaseClient(DB_URL, DB_KEY)
    .from("articles")
    .select(fields.join(", "))
    .eq("slug", slug)
    .single();
  if (!data?.length || error) return [];
  type PostsResponse = ResolveResponse<typeof data, Articles>;
  return data as PostsResponse;
}

export async function getAllPosts(fields = []) {
  const article = `articles(${fields.join(", ")}`;
  type Articles = ResolveRelationQuery<typeof article>;

  const { data, error } = await databaseClient(DB_URL, DB_KEY)
    .from("articles")
    .select(fields.join(", "))
    .order("created_at", { ascending: false });
  if (!data?.length || error) return [];
  type PostsResponse = ResolveArrayResponse<typeof data, Articles>;
  return data as PostsResponse;
}

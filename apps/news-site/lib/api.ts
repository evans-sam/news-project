import fs from 'fs'
import { join } from 'path'
import { DatabaseClient } from 'clients'

const DB_URL = process.env.SUPABASE_URL;
const DB_KEY = process.env.SUPABASE_KEY;

export async function getPostSlugs() {
  let newVar = await new DatabaseClient(DB_URL, DB_KEY).client.from('articles').select('slug');
  return newVar;
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const { data, error } = await new DatabaseClient(DB_URL, DB_KEY).client.from('articles').select('*').eq('slug', slug).single();
  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export async function getAllPosts(fields: string[] = []) {
  const {data, error } = await getPostSlugs()
  return await Promise.all(data.map(async ({ slug }) => await getPostBySlug(slug, fields)));
}

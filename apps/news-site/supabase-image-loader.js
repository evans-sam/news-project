import { databaseClient } from 'clients';

const DB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function supabaseLoader({ src, width, quality }) {

  const { data } = databaseClient(DB_URL, DB_KEY)
    .storage
    .from('images')
    .getPublicUrl(src, {
      // transform: {
      //   width
      // }
    })
  
  if (data && data.publicUrl) return data.publicUrl;
  
  const url = new URL(DB_URL);
  url.pathname = `storage/v1/object/public/images${src}`;
  
  // TODO: only works with pro supabase
  // if (width) url.searchParams.set('width', width);
  // if (quality) url.searchParams.set('quality', quality);
  
  console.log('url', url.toString());
  return url.toString();
}

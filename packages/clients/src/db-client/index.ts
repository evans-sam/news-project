import { createClient } from '@supabase/supabase-js';
import { Database } from './database.gen';

export * from './database.gen';
export * from './types';

export const databaseClient = createClient<Database>;

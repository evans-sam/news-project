import { createClient } from '@supabase/supabase-js';
import type { Database } from './db-client/database.gen';

export * from './db-client/database.gen';
export * from './db-client/types';

export const databaseClient = createClient<Database>;

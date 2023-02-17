import { createClient } from '@supabase/supabase-js';
import type { Database } from './db-client/database';

export * from './db-client/database';
export * from './db-client/types';

export const databaseClient = createClient<Database>;

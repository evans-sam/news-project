import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database";

export * from './database';
export class DatabaseClient {
	client: SupabaseClient<Database>;
	constructor(db_url: string, db_key: string) {
		this.client = createClient<Database>(db_url, db_key);
	}
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          author: string | null;
          content: string | null;
          created_at: string | null;
          excerpt: string | null;
          id: string;
          image: string | null;
          slug: string;
          title: string;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          created_at?: string | null;
          excerpt?: string | null;
          id?: string;
          image?: string | null;
          slug: string;
          title: string;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          created_at?: string | null;
          excerpt?: string | null;
          id?: string;
          image?: string | null;
          slug?: string;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

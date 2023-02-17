create table "public"."articles" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "slug" text not null,
    "title" text not null,
    "image" text,
    "content" text,
    "excerpt" text,
    "author" text
);

CREATE UNIQUE INDEX articles_pkey ON public.articles USING btree (id);

CREATE UNIQUE INDEX articles_slug_key ON public.articles USING btree (slug);

alter table "public"."articles" add constraint "articles_pkey" PRIMARY KEY using index "articles_pkey";

alter table "public"."articles" add constraint "articles_slug_key" UNIQUE using index "articles_slug_key";



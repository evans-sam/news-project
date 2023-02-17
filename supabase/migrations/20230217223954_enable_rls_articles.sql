alter table "public"."articles" enable row level security;

create policy "Enable read access for all users"
on "public"."articles"
as permissive
for select
to public
using (true);




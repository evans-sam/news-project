import React from 'react';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import { getPostBySlug, getPostSlugs } from '../../lib/api';

type Props = {
  params: Params;
};

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return await getPostSlugs();
}

export default async function Page({ params: { slug } }: Props) {
  const { author, content, created_at, image, title } = await getPostBySlug(slug, [
    'title',
    'created_at',
    'author',
    'content',
    'image',
  ]);

  return (
    <>
      <PostHeader title={title} image={image} date={created_at} author={author} />
      <PostBody content={content} />
    </>
  );
}

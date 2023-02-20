import React from 'react';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import { getPostBySlug, getPostSlugs } from '../../lib/api';
import { notFound } from 'next/navigation';

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
  const post = await getPostBySlug(slug, ['title', 'created_at', 'author', 'content', 'image']);

  if (!post) notFound();

  return (
    <>
      <PostHeader title={post.title} image={post.image} date={post.created_at} author={post.author} />
      <PostBody content={post.content} />
    </>
  );
}

import React from 'react';
import Header from '../../components/header';
import { getPostBySlug } from '../../lib/api';

type Props = {
  children: React.ReactNode;
};
type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetaData({ params: { slug } }: Params) {
  const article = await getPostBySlug(slug, ['title', 'created_at', 'author', 'image']);

  return {
    openGraph: {
      type: 'article',
      publishedTime: article?.created_at,
      title: article?.title,
      authors: [{ name: article?.author }],
      images: [{ url: article?.image }],
    },
  };
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <article className="mb-32">{children}</article>
    </>
  );
}

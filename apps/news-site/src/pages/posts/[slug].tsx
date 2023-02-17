import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import type PostType from '../../interfaces/post';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title}</title>
                <meta property="og:image" content={post.image} />
              </Head>
              <PostHeader
                title={post.title}
                image={post.image}
                date={post.created_at}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'created_at',
    'slug',
    'author',
    'content',
    'image',
    'content',
  ]);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const data = await getAllPosts(['slug', 'author']);

  return {
    paths: data.map(({ slug, author }) => {
      return {
        params: {
          slug,
          author,
        },
      };
    }),
    fallback: false,
  };
}

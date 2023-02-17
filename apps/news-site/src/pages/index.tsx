import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const [heroPost, ...morePosts] = allPosts;
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              image={heroPost.image}
              date={heroPost.created_at}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts?.length && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await getAllPosts([
    "title",
    "created_at",
    "slug",
    "author",
    "image",
    "excerpt",
    "content",
  ]);

  return {
    props: { allPosts: response },
  };
};

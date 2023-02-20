import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import { getAllPosts } from '../lib/api';

export default async function Page() {
  const [heroPost, ...morePosts] = await getAllPosts([
    'title',
    'created_at',
    'slug',
    'author',
    'image',
    'excerpt',
    'content',
  ]);

  return (
    <>
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
    </>
  );
}

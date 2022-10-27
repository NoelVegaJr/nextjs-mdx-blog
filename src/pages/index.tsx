import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '../components/Admin/BlogCard';
import { trpc } from '../utils/trpc';

interface IHomeProps {}
const Home = () => {
  const posts = trpc.getBlogPosts.useQuery();

  if (!posts.data || posts.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=' mt-8 flex flex-col items-center gap-8 px-4 sm:px-12'>
      {posts?.data?.map((post: any, index: number) => {
        return (
          <div key={index} className='w-full'>
            <Link href={'/blog/' + post.id}>
              <a>
                <BlogCard {...post} />
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

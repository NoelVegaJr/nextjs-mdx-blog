import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

interface IHomeProps {}
const Home = () => {
  const router = useRouter();
  const posts = trpc.getBlogPosts.useQuery();
  return (
    <div className=' mt-8 flex flex-col gap-8 items-center px-4 sm:px-12'>
      {posts?.data?.map((post: any, index: number) => {
        return (
          <Link href={'/blog/' + post.id} passHref key={index}>
            <div
              className='border border-slate-300 p-8 flex flex-col  rounded-lg  w-full max-w-5xl cursor-pointer shadow-md hover:shadow-lg hover:scale-105 duration-300
            '
            >
              <header className='mb-2'>
                <h5 className=' text-lg md:text-2xl'>
                  <strong>{post.title}</strong>
                </h5>
              </header>

              <main className='w-full flex flex-col items-center  justify-between gap-4'>
                <div className='h-full w-full flex flex-col md:flex-row justify-between gap-4 '>
                  <div className='flex flex-col md:flex-row md:w-full justify-between gap-4'>
                    <div className='flex flex-col justify-between h-full'>
                      <div>
                        <p className='font-semibold mb-2'>{post.description}</p>
                        <div className='flex flex-col gap-2 '>
                          <i className=''>{post.date}</i>

                          <div className='flex flex-wrap'>
                            {post.tags?.map((tag: string, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className='bg-blue-600 w-fit text-sm px-2 py-1 text-white rounded border hover:brightness-110 duration-300'
                                >
                                  {tag}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {post.demoUrl && (
                        <a
                          href={post.demoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={(e) => {
                            console.log(post.demoUrl);
                            e.stopPropagation();
                          }}
                          className='group bg-slate-900 text-white w-fit px-4 py-1 rounded hover:brightness-105'
                        >
                          Live Demo
                          <div className='w-0 group-hover:w-full h-0.5 transition-all duration-500 ease-in-out bg-white' />
                        </a>
                      )}
                    </div>
                    <div className='relative h-72 w-full md:w-1/2'>
                      <Image
                        src={post.thumbnailUrl}
                        alt='thumbnail'
                        layout='fill'
                        objectFit='contain'
                        className='rounded w-full absolute'
                      />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

// export const getStaticProps = async () => {
//   const files = fs.readdirSync(path.join('src', 'posts'));

//   const posts = files.map((filename) => {
//     console.log('file: ', filename);
//     const mardownWithMeta = fs.readFileSync(
//       path.join('src', 'posts', filename)
//     );
//     const { data: frontMatter } = matter(mardownWithMeta);
//     console.log(frontMatter);
//     return {
//       frontMatter,
//       slug: filename.split('.')[0],
//     };
//   });

//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default Home;

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface IHomeProps {
  posts: any;
}
const Home = ({ posts }: IHomeProps) => {
  return (
    <div className=' mt-8 flex flex-col gap-8 items-center px-4 sm:px-12'>
      {posts.map((post: any, index: number) => {
        return (
          <Link href={'/blog/' + post.slug} passHref key={index}>
            <div
              className='border border-slate-300 p-8 flex flex-col  rounded-lg  w-full max-w-5xl cursor-pointer shadow-md hover:shadow-lg hover:scale-105 duration-300
            '
            >
              <header className='mb-2'>
                <h5 className=' text-lg md:text-2xl'>
                  <strong>{post.frontMatter.title}</strong>
                </h5>
              </header>

              <main className='w-full flex flex-col items-center  justify-between gap-4'>
                <div className='h-full w-full flex flex-col md:flex-row justify-between gap-4 '>
                  <div className='flex flex-col md:flex-row md:w-full justify-between gap-4'>
                    <div className='flex flex-col '>
                      <p className='font-semibold mb-2'>
                        {post.frontMatter.description}
                      </p>
                      <div className='flex flex-col gap-2'>
                        <i className=''>{post.frontMatter.date}</i>

                        <div className='flex flex-wrap'>
                          {post.frontMatter.tags.map((tag: string) => {
                            return (
                              <div
                                key={post.frontMatter.title}
                                className='bg-blue-600 w-fit text-sm px-2 py-1 text-white rounded border hover:brightness-110 duration-300'
                              >
                                {tag}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='relative h-72 w-full md:w-1/2'>
                      <Image
                        src={post.frontMatter.thumbnailUrl}
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

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'posts'));

  const posts = files.map((filename) => {
    const mardownWithMeta = fs.readFileSync(
      path.join('src', 'posts', filename)
    );
    const { data: frontMatter } = matter(mardownWithMeta);

    return {
      frontMatter,
      slug: filename.split('.')[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;

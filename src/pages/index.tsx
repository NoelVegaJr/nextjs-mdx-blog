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
    <div className=' mt-8 flex flex-col gap-8 items-center '>
      {posts.map((post: any, index: number) => {
        return (
          <Link href={'/blog/' + post.slug} passHref key={index}>
            <div
              className='border border-slate-300 rounded-lg p-4 w-3/4 cursor-pointer shadow-md hover:shadow-lg hover:scale-105 duration-300
            '
            >
              <header className='flex gap-8'>
                <div className='w-3/4 flex flex-col justify-between'>
                  <div>
                    <h5 className='text-2xl'>
                      <strong>{post.frontMatter.title}</strong>
                    </h5>
                    <p className='text-lg p-2 font-semibold'>
                      {post.frontMatter.description}
                    </p>
                    <div className='flex flex-wrap'>
                      {post.frontMatter.tags.map((tag: string) => {
                        return (
                          <div
                            key={post.frontMatter.title}
                            className='bg-blue-600 w-fit px-2 py-1 text-white rounded border hover:brightness-110 duration-300'
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <p className=''>{post.frontMatter.date}</p>
                </div>
                <Image
                  src={post.frontMatter.thumbnailUrl}
                  alt='thumbnail'
                  width={500}
                  height={400}
                  objectFit='fill'
                  className='rounded w-1/5'
                />
              </header>
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

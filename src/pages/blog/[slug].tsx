import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import Button from '../../components/Button';
import Step from '../../components/Step';
const components = { Button, Step };

interface IPostPageProps {
  frontMatter: { title: string; date: string };
  mdxSource: any;
}

const PostPage = ({ frontMatter, mdxSource }: IPostPageProps) => {
  console.log(frontMatter);
  console.log('rendering post page');
  if (!frontMatter) {
    return <div>error</div>;
  }
  console.log(frontMatter);
  const { title, date } = frontMatter;
  return (
    <div>
      <h1 className='text-3xl'>{title}</h1>
      <MDXRemote {...mdxSource} components={components}></MDXRemote>
    </div>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('src', 'posts'));

  const paths = files.map((filename: any) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
};

const getStaticProps = async ({ params }: any) => {
  const file = path.join('src', 'posts', params.slug + '.mdx');
  const markdownWithMeta = fs.readFileSync(file);

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug: params.slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;

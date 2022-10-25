import fs from 'fs';
import matter, { GrayMatterFile } from 'gray-matter';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import Button from '../../components/Button';
const components = { Button, SyntaxHighlighter };

interface IPostPageProps {
  frontMatter: { title: string; date: string };
  mdxSource: any;
}

const PostPage = ({ frontMatter, mdxSource }: IPostPageProps) => {
  console.log('rendering post page');
  const { title, date } = frontMatter;
  return (
    <div>
      <h1>{title}</h1>
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

import Button from '../../components/Button';
import Step from '../../components/Step';
const components = { Button, Step };
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';
import Link from 'next/link';

const PostPage = () => {
  const router = useRouter();
  const { slug: id } = router.query;
  if (!id) {
    router.push('/');
    return;
  }
  console.log(Number(id));
  const post = trpc.getBlogPostsById.useQuery({ id: Number(id) });

  console.log('rendering post page');
  console.log(id);

  return (
    <div>
      {post.data && (
        <div>
          <h2 className='text-4xl'>{post.data.title}</h2>
          <i>{post.data.date}</i>

          <div className='relative h-72 w-full md:w-1/2 mx-auto'>
            <Image
              src={post.data.thumbnailUrl}
              alt='thumbnail'
              layout='fill'
              objectFit='contain'
              className='rounded w-full absolute'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <div>
              <p>Description:</p>
              <p>{post.data.description}</p>
            </div>
            <a
              href={post.data.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-slate-900 text-white font-semibold px-4 p-2 w-fit rounded'
            >
              View Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;

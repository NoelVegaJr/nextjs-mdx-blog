import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';
import ViewerStep from '../../components/Admin/Step/ViewerStep';
import Chat from './chat';

const PostPage = () => {
  const router = useRouter();
  const { slug: id } = router.query;
  const steps = trpc.getStepsByBlogPostId.useQuery({
    id: Number(id),
  });

  if (!id) {
    router.push('/');
    return;
  }
  const post = trpc.getBlogPostsById.useQuery({ id: Number(id) });

  if (!steps.data || steps.isLoading || steps.error) {
    return <div>Loading</div>;
  }

  return (
    <div className='  flex h-full '>
      {post.data && (
        <div className='h-full grow overflow-y-auto   px-12'>
          <header className='mb-12 mt-6'>
            <div className='mb-2 text-center'>
              <h2 className=' text-7xl font-bold text-blue-600'>
                {post.data.title}
              </h2>
              <div className='flex items-center justify-center gap-4'>
                {post.data.user?.image && (
                  <Image
                    src={post.data.user?.image!}
                    alt='user avatar'
                    width={40}
                    height={40}
                    className='rounded-full'
                  />
                )}
                <div>
                  <p className='text-lg font-semibold'>{post.data.user.name}</p>
                  <p className='font-semibold text-slate-500'>
                    {post.data.date}
                  </p>
                </div>
              </div>
            </div>
            <div className='mx-auto w-fit'>
              <Image
                src={post.data.thumbnailUrl}
                alt={'blog post thumbnail'}
                width={600}
                height={400}
                className=''
              />
            </div>
            <p className='text-xl'>Description:</p>
            <p className='text-xl '>&emsp;{post.data.description}</p>
          </header>

          <ul className='flex flex-col gap-12 '>
            {post.data.steps.map((step) => {
              return (
                <li key={id + step.id.toString()} className=''>
                  <ViewerStep step={step} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Chat />
    </div>
  );
};

export default PostPage;

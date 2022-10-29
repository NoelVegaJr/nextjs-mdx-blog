import * as React from 'react';
import Image from 'next/image';
import { trpc } from '../../utils/trpc';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import ViewerStep from '../Admin/Step/ViewerStep';
import { IBlogPost } from '../../types/BlogPost';

const BlogPost: React.FunctionComponent<IBlogPost> = ({
  id,
  title,
  date,
  description,
  thumbnailUrl,
  demoUrl,
  email,
  steps,
  user,
}: IBlogPost) => {
  if (!id) {
    return <div>Loading...</div>;
  }
  return (
    <div className=' container mx-auto max-w-4xl'>
      <>
        <header className='mb-12 mt-6'>
          <div className='mb-2 text-center'>
            <h2 className=' text-7xl font-bold text-blue-600'>{title}</h2>
            <div className='flex items-center justify-center gap-4'>
              {user?.image && (
                <Image
                  src={user?.image!}
                  alt='user avatar'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              )}
              <div>
                <p className='text-lg font-semibold'>{user.name}</p>
                <p className='font-semibold text-slate-500'>{date}</p>
              </div>
            </div>
          </div>
          <div className='mx-auto w-fit'>
            <Image
              src={thumbnailUrl}
              alt={'blog post thumbnail'}
              width={600}
              height={400}
              className=''
            />
          </div>
          <p className='text-xl'>Description:</p>
          <p className='text-xl '>&emsp;{description}</p>
        </header>

        <ul className='flex flex-col gap-12 '>
          {steps.map((step) => {
            return (
              <li key={id + step.id.toString()} className=''>
                <ViewerStep step={step} />
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
};

export default BlogPost;

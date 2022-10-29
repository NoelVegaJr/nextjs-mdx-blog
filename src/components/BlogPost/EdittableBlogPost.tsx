import * as React from 'react';
import Image from 'next/image';
import { trpc } from '../../utils/trpc';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user-context';
import ViewerStep from '../Admin/Step/ViewerStep';
import { IBlogPost } from '../../types/BlogPost';
import EdittableStep from '../Admin/Step/EdittableStep';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';

const EdittableBlogPost: React.FunctionComponent<IBlogPost> = ({
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
  const [editingHeader, editingHeaderSet] = useState(false);
  const [header, headerSet] = useState(title);
  const [editingDescription, editingDescriptionSet] = useState(false);
  const [desc, descSet] = useState(description);

  useEffect(() => {
    headerSet(title);
    descSet(description);
  }, [title, description]);

  if (!id) {
    return <div>Loading...</div>;
  }
  console.log(header);
  return (
    <div className='w-full grow overflow-y-auto px-4'>
      <header className='mb-12 mt-6'>
        <div className='mb-2 text-center'>
          {editingHeader ? (
            <input
              type='text'
              value={header}
              className='text-center text-5xl font-bold text-blue-600'
              onBlur={() => editingHeaderSet(false)}
              autoFocus
              onChange={(e) => headerSet(e.target.value)}
            />
          ) : (
            <h2
              className=' p-2 text-7xl font-bold text-blue-600'
              onClick={() => editingHeaderSet(true)}
            >
              {title}
            </h2>
          )}

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
        {editingDescription ? (
          <textarea
            value={desc}
            autoFocus
            className='w-full p-2 text-xl'
            onBlur={() => editingDescriptionSet(false)}
            onChange={(e) => descSet(e.target.value)}
            rows={5}
          />
        ) : (
          <p className='text-xl ' onClick={() => editingDescriptionSet(true)}>
            &emsp;{description}
          </p>
        )}
      </header>

      <ul className='flex flex-col gap-12 '>
        {steps.map((step: any) => {
          return (
            <li key={id + step.id.toString()} className=''>
              <EdittableStep step={step} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EdittableBlogPost;

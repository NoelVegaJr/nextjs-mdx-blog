import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import uploadImage from '../../utils/imageUpload';
import { trpc } from '../../utils/trpc';
import Input from '../Input';

interface INewBlogPostFormProps {}

const NewBlogPostForm: React.FunctionComponent<INewBlogPostFormProps> = (
  props
) => {
  const createBlogPost = trpc.createBlogPost.useMutation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<File | null>();
  const [demoUrl, setDemoUrl] = useState('');
  const { data: session } = useSession();

  const [testRef] = useAutoAnimate<HTMLDivElement>();

  const sumbitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnailUrl || (!demoUrl && !session?.user)) return;
    const thumbnailUrlCloudinary = await uploadImage(thumbnailUrl);

    const blogPost = {
      title,
      date,
      description,
      thumbnailUrl: thumbnailUrlCloudinary.secure_url,
      demoUrl: demoUrl?.toString(),
      email: session?.user?.email!,
    };

    createBlogPost.mutate(blogPost);

    setTitle('');
    setDate('');
    setDescription('');
    setThumbnailUrl(null);
    setDemoUrl('');
  };

  return (
    <div className='mt-10 rounded border border-slate-400 p-6' ref={testRef}>
      <form onSubmit={sumbitHandler} className='mt-8 flex flex-col gap-4'>
        <Input
          id={'title'}
          label='Title'
          type='text'
          placeholder='title'
          value={title}
          setValue={setTitle}
        />
        <Input
          label='Date created'
          id='date'
          type='date'
          value={date}
          placeholder={''}
          setValue={setDate}
        />
        <Input
          label='Description'
          id='description'
          type='text'
          placeholder='description'
          value={description}
          setValue={setDescription}
        />
        <div>
          <p>Choose a thumbnail</p>
          <input
            onChange={(e) => setThumbnailUrl(e.target.files![0])}
            accept='.jpg, .png, .jpeg'
            className='fileInput mb-2'
            type='file'
            name='Choose thumbnail'
          ></input>
        </div>
        <Input
          label='Demo url'
          id='demo'
          type='text'
          placeholder='demo url'
          value={demoUrl}
          setValue={setDemoUrl}
        />

        {/* <input type='text' placeholder='tags' /> */}
        <button
          type='submit'
          className='rounded bg-green-600 p-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-700 '
        >
          Submit
        </button>
        <button
          type='button'
          className='rounded bg-red-600 p-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700 '
          onClick={() => {}}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewBlogPostForm;

import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import uploadImage from '../../utils/imageUpload';
import { trpc } from '../../utils/trpc';
import Dropdown from '../Dropdown';
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

  const [testRef] = useAutoAnimate<HTMLDivElement>();

  const sumbitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnailUrl || !demoUrl) return;
    const thumbnailUrlCloudinary = await uploadImage(thumbnailUrl);

    const blogPost = {
      title,
      date,
      description,
      thumbnailUrl: thumbnailUrlCloudinary.secure_url,
      demoUrl: demoUrl?.toString(),
    };

    createBlogPost.mutate(blogPost);

    setTitle('');
    setDate('');
    setDescription('');
    setThumbnailUrl(null);
    setDemoUrl('');
  };

  return (
    <div className='mt-10 border border-slate-400 p-6 rounded' ref={testRef}>
      <Dropdown>
        <form onSubmit={sumbitHandler} className='flex flex-col gap-4 mt-8'>
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
            className='bg-green-600 text-white p-2 text-lg font-semibold rounded hover:bg-green-700 transition-all duration-300 '
          >
            Submit
          </button>
          <button
            type='button'
            className='bg-red-600 text-white p-2 text-lg font-semibold rounded hover:bg-red-700 transition-all duration-300 '
            onClick={() => {}}
          >
            Cancel
          </button>
        </form>
      </Dropdown>
    </div>
  );
};

export default NewBlogPostForm;

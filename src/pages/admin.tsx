import * as React from 'react';
import { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import autoAnimate from '@formkit/auto-animate';
import Link from 'next/link';

interface IDropdown {
  children: JSX.Element | JSX.Element[];
}

const Dropdown = ({ children }: IDropdown) => {
  const [show, setShow] = useState(false);
  const parent = React.useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  return (
    <div ref={parent}>
      <>
        <button
          onClick={reveal}
          className='bg-slate-800 w-full p-4 text-white font-semibold text-lg rounded'
        >
          Create a new Blog Post
        </button>
        {show && <>{children}</>}
      </>
    </div>
  );
};

interface IAdminProps {}

interface IInputProps {
  placeholder: string;
  value: string;
  type: string;
  label: string;
  id: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const Input = ({
  id,
  label,
  placeholder,
  value,
  type,
  setValue,
}: IInputProps) => {
  return (
    <div>
      <label htmlFor={id} className='block mb-2'>
        {label}
      </label>
      <input
        id={id}
        className='border border-slate-300 w-full p-2 rounded outline-none focus:border-slate-500'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const uploadImage = async (image: any) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'codefork-blog');
  data.append('cloud_name', 'dnqazzwfi');

  const response = await fetch(
    ' https://api.cloudinary.com/v1_1/dnqazzwfi/image/upload',
    {
      method: 'post',
      body: data,
    }
  );
  const cloudinaryData = await response.json();
  return cloudinaryData;
};

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const [creatingNewBlogPost, isCreatingNewBlogPost] = useState(false);
  const blogPosts = trpc.getBlogPosts.useQuery();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<File | null>();
  const [demoUrl, setDemoUrl] = useState('');
  const createBlogPost = trpc.createBlogPost.useMutation();
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
    <>
      {!creatingNewBlogPost ? (
        <button
          onClick={() => isCreatingNewBlogPost(true)}
          className='bg-slate-800 w-full p-4 text-white font-semibold text-lg rounded'
        >
          Create a new Blog Post
        </button>
      ) : (
        <div
          className='mt-10 border border-slate-400 p-6 rounded'
          ref={testRef}
        >
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
                onClick={() => isCreatingNewBlogPost(false)}
              >
                Cancel
              </button>
            </form>
          </Dropdown>
        </div>
      )}
      {!blogPosts.data ? (
        <div>loading</div>
      ) : (
        <div>
          {blogPosts.data.map((blogPost: any) => {
            return (
              <li key={blogPost.id}>
                <Link href={'/admin/blog/' + ''}>
                  <a href=''>{blogPost.title}</a>
                </Link>
              </li>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Admin;

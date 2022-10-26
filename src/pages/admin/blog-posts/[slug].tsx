import { useAutoAnimate } from '@formkit/auto-animate/react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';
import Input from '../../../components/Input';
import NewBlogPostForm from '../../../components/Admin/NewBlogPostForm';
import { useState } from 'react';
import { number } from 'zod';

const initialBullets = [
  { id: 1, text: 'bullet 1' },
  { id: 2, text: 'bullet 2' },
  { id: 3, text: 'bullet 3' },
  { id: 4, text: 'bullet 4' },
];

const sampleStep = {
  id: 1,
  index: 1,
  title: 'npm install',
  bullets: initialBullets,
  code: `
<Input
  id='bullet'
  label='Bullet'
  placeholder='Bullet'
  value={bullet}
  setValue={setBullet}
  type='text'
/>`,
};

const AdminPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState(sampleStep.title);
  const [bullet, setBullet] = useState('');
  const [bullets, setBullets] = useState<{ id: number; text: string }[]>(
    sampleStep.bullets
  );
  const [code, setCode] = useState(sampleStep.code);
  const [bulletListRef] = useAutoAnimate<HTMLUListElement>();

  const deleteBulletHandler = (id: number) => {
    const updatedBullets = bullets.filter((bullet) => bullet.id !== id);
    setBullets(updatedBullets);
  };

  const addBulletHandler = () => {
    console.log('adding bullet');
    setBullets((prev) => [...prev, { id: Math.random(), text: bullet }]);
  };

  const submitStepHandler = () => {
    console.log('submitting step');
  };

  const { slug: id } = router.query;
  if (!id) {
    router.push('/');
    return;
  }
  console.log(Number(id));
  const post = trpc.getBlogPostsById.useQuery({ id: Number(id) });

  return (
    <div className='flex flex-col gap-6'>
      <NewBlogPostForm />

      <div className='border flex flex-col p-6 gap-4 border-slate-400 rounded'>
        <Input
          id='step'
          label='Title'
          placeholder='title'
          value={title}
          setValue={setTitle}
          type='text'
        />
        <div>
          <label htmlFor='bullet' className='mb-2'>
            Bullet
          </label>
          <input
            id='bullet'
            type='text'
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && addBulletHandler()}
            className='border border-slate-300 w-full p-2 rounded outline-none focus:border-slate-500 mb-2'
          />
          <ul className='flex flex-col gap-1' ref={bulletListRef}>
            {bullets?.map((bullet) => {
              return (
                <li key={bullet.id} className='flex justify-between gap-2'>
                  <p>{bullet.text}</p>
                  <button
                    type='button'
                    onClick={() => deleteBulletHandler(bullet.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 stroke-red-600'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <textarea
          id='bullet'
          placeholder='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className='w-full h-96 border border-slate-300 outline-none rounded  '
        />
        <button
          onClick={submitStepHandler}
          className='bg-green-600 text-white font-semibold p-2 rounded'
        >
          Submit
        </button>
      </div>
      <div>
        <p className='text-2xl'>
          <span>{sampleStep.index}. </span>
          {title}
        </p>
        <ul ref={bulletListRef}>
          {bullets?.map((bullet) => {
            return (
              <li key={bullet.id} className='list-disc ml-12'>
                {bullet.text}
              </li>
            );
          })}
        </ul>
        <SyntaxHighlighter
          customStyle={{ paddingLeft: '20px' }}
          language='javascript'
          style={atomOneDark}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default AdminPostPage;

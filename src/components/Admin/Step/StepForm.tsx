import * as React from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { trpc } from '../../../utils/trpc';

interface Step {
  blogPostId: number;
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}
interface IStepFormProps {
  step: Step | null;
  blogPostId: number;
  onChange: (step: Step | null) => void;
  stepCount: number;
}

const StepForm: React.FunctionComponent<IStepFormProps> = ({
  step,
  onChange,
  blogPostId,
  stepCount,
}: IStepFormProps) => {
  const createStep = trpc.createBlogPostStep.useMutation();
  const editBlogPostStep = trpc.editBlogPostStep.useMutation();
  const utils = trpc.useContext();
  const parent = useRef(null);
  const [show, setShow] = useState(false);
  const reveal = () => setShow(!show);
  const [bulletListRef] = useAutoAnimate<HTMLUListElement>();
  const [bullet, setBullet] = useState('');

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const deleteBulletHandler = (id: number) => {
    if (step?.bullets) {
      const updatedBullets = step?.bullets.filter((bullet) => bullet.id !== id);
      onChange({ ...step, bullets: updatedBullets });
    }
  };
  console.log(step?.bullets);
  const addBulletHandler = () => {
    const bullets = [];
    if (step?.bullets) {
      onChange({
        ...step!,
        bullets: [...step?.bullets!, { id: Math.random(), text: bullet }],
      });
    } else {
      onChange({
        ...step!,
        bullets: [{ id: Math.random(), text: bullet }],
      });
    }
  };

  const submitStepHandler = () => {
    console.log(step);
    if (!step) return;
    if (!step?.id) {
      console.log('new step');
      // console.log({ ...step, bullets: step?.bullets ?? [] });
      createStep.mutate(
        {
          blogPostId,
          title: step.title,
          code: step.code,
          bullets: step.bullets?.map((b) => b.text) ?? [],
          index: stepCount + 1,
        },
        {
          onSuccess: () => {
            utils.getBlogPostsById.invalidate({ id: blogPostId });
          },
        }
      );
    } else {
      console.log('editing step');
      editBlogPostStep.mutate(
        {
          blogPostId,
          id: step.id,
          title: step.title,
          code: step.code,
          bullets: step.bullets.map((b) => b.text),
        },
        {
          onSuccess: () => {
            utils.getBlogPostsById.invalidate({ id: blogPostId });
          },
        }
      );
    }

    console.log('submitting step');
  };
  return (
    <div className='flex w-1/2 flex-col gap-4 rounded border border-slate-400 p-6'>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          value={step?.title ?? ''}
          type='text'
          onChange={(e) => {
            onChange({ ...step!, title: e.target.value });
          }}
          className='mb-2 w-full rounded border border-slate-300 p-2 outline-none focus:border-slate-500'
        />
      </div>
      <div>
        <label htmlFor='bullet' className='mb-2'>
          Bullet
        </label>
        <input
          id='bullet'
          type='text'
          value={bullet}
          onChange={(e) => {
            setBullet(e.target.value);
          }}
          onKeyUp={(e) => e.key === 'Enter' && addBulletHandler()}
          className='mb-2 w-full rounded border border-slate-300 p-2 outline-none focus:border-slate-500'
        />
        <ul className='flex flex-col gap-1' ref={bulletListRef}>
          {step?.bullets?.map((bullet) => {
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
                    className='h-6 w-6 stroke-red-600'
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

      <div>
        <label htmlFor='code'>Code</label>
        <textarea
          id='code'
          value={step?.code ?? ''}
          onChange={(e) => {
            onChange({ ...step!, code: e.target.value });
          }}
          className='h-96 w-full rounded border border-slate-300 outline-none  '
        />
        <button
          onClick={submitStepHandler}
          className='w-full rounded bg-green-600 p-2 font-semibold text-white hover:bg-green-700'
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StepForm;

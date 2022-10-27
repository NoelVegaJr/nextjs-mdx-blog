import autoAnimate from '@formkit/auto-animate';
import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface Step {
  blogPostId: number;
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}

interface IStepDropdownProps {
  steps: Step[] | null;
  selectedStep: Step | null;
  onChange: Dispatch<SetStateAction<Step | null>>;
}

const StepDropdown: React.FunctionComponent<IStepDropdownProps> = ({
  steps,
  selectedStep,
  onChange,
}: IStepDropdownProps) => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  console.log(steps);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);
  return (
    <div
      ref={parent}
      className='relative cursor-pointer border border-slate-400'
    >
      <div
        onClick={reveal}
        className='flex justify-between rounded border border-slate-400 p-2 hover:bg-slate-100'
      >
        {selectedStep ? (
          <div>
            {selectedStep.index && <span>{selectedStep.index}. </span>}
            {selectedStep.title}
          </div>
        ) : (
          <div>New Step</div>
        )}

        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`h-6 w-6 ${
            show && 'rotate-90'
          } transition-all duration-100`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </div>
      {show && (
        <ul className='absolute z-50 w-full rounded border border-slate-400 bg-white'>
          <li
            onClick={() => {
              onChange(null);
              setShow(false);
            }}
            className='p-2 hover:bg-slate-100'
          >
            New Step
          </li>
          {steps?.map((step) => {
            return (
              <li
                key={step.id}
                className='p-2 hover:bg-slate-100'
                onClick={() => {
                  console.log(step);
                  onChange(step);
                  setShow(false);
                }}
              >
                {step.index && <span>{step.index}. </span>}
                {step.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StepDropdown;

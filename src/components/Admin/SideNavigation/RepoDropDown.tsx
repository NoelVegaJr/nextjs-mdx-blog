import * as React from 'react';
import { useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

interface IStepDropDownProps {
  title: string;
}

const RepoDD: React.FunctionComponent<IStepDropDownProps> = ({ title }) => {
  const [ddSteps, ddStepsSet] = useState<boolean>(false);
  const parent = useRef(null);

  React.useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div onClick={() => ddStepsSet(!ddSteps)} ref={parent}>
      <div className=' text-md flex justify-between pl-2 font-semibold text-slate-500'>
        {title}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`h-6 w-6 ${ddSteps && 'rotate-90'} hover:cursor-pointer`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </div>
      {/* {ddSteps && (
        <ul className={`  pl-2 `}>
          {steps?.map((step: any) => {
            return (
              <li key={step.id} className='text-md pl-2 text-slate-500'>
                {step.index}. {step.title}
              </li>
            );
          })}
        </ul>
      )} */}
    </div>
  );
};

export default RepoDD;

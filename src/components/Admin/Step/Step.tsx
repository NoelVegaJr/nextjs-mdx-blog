import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface IStep {
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}

interface IStepProps {
  step: IStep | null;
  stepCount: number;
}

const Step: React.FunctionComponent<IStepProps> = ({
  step,
  stepCount,
}: IStepProps) => {
  const [bulletListRef] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className='w-2/4 '>
      {step && (
        <div>
          <p className='mb-2 text-2xl'>
            <span>{step.index ? step.index : stepCount + 1}. </span>
            {step.title}
          </p>
          <ul ref={bulletListRef} className='mb-2'>
            {step.bullets?.map((bullet) => {
              return (
                <li key={bullet.id} className='ml-12 list-disc'>
                  {bullet.text}
                </li>
              );
            })}
          </ul>
          {step?.code && (
            <div className='overflow-hidden rounded'>
              <SyntaxHighlighter
                customStyle={{ paddingLeft: '20px' }}
                language='javascript'
                style={atomOneDark}
              >
                {step.code}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Step;

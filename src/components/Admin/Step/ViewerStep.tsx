import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import * as React from 'react';

interface IViewerStepProps {}

interface IStep {
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}

interface IViewerStepProps {
  step: IStep | null;
}

const ViewerStep: React.FunctionComponent<IViewerStepProps> = ({
  step,
}: IViewerStepProps) => {
  return (
    <div className=' '>
      {step && (
        <div>
          <p className='mb-2 text-3xl font-bold'>
            <span>{step.index}. </span>
            {step.title}
          </p>
          <ul className='mb-2'>
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

export default ViewerStep;

import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface IViewerStepProps {}

interface IStep {
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}

interface IViewerStepProps {
  step: IStep;
}

const EdittableStep: React.FunctionComponent<IViewerStepProps> = ({
  step,
}: IViewerStepProps) => {
  const [editingTitle, editingTitleSet] = useState(false);
  const [title, titleSet] = useState(step.title);

  useEffect(() => {
    titleSet(step.title);
  }, [step.title]);
  return (
    <div className=' '>
      {step && (
        <div>
          {editingTitle ? (
            <input
              type='text'
              autoFocus
              value={title}
              onChange={(e) => titleSet(e.target.value)}
              onBlur={() => editingTitleSet(false)}
              className='w-full p-2 text-3xl font-bold'
            />
          ) : (
            <p
              className='mb-2 text-3xl font-bold'
              onClick={() => editingTitleSet(true)}
            >
              <span>{step.index}. </span>
              {step.title}
            </p>
          )}

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

export default EdittableStep;

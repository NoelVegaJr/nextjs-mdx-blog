import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
interface IStepProps {
  title: string;
  steps: string[];
  code: string;
}

const Step = ({ title, steps, code }: IStepProps) => {
  return (
    <div>
      <h5 className='text-5xl font-bold'>{title}</h5>
      <ol className='mb-4 pl-8'>
        {steps.map((step, index: number) => {
          return (
            <>
              <li key={index} className='list-disc '>
                {step}
              </li>
            </>
          );
        })}
      </ol>
      <SyntaxHighlighter
        customStyle={{ paddingLeft: '20px' }}
        language='javascript'
        style={atomOneDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Step;

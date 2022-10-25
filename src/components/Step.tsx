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
      <h5 className='text-lg font-semibold'>{title}</h5>
      <ol className='pl-8 mb-4'>
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
      <SyntaxHighlighter language='javascript' style={atomOneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Step;

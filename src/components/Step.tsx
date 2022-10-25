import SyntaxHighlighter from 'react-syntax-highlighter';

interface IStepProps {
  title: string;
  steps: string[];
}

const Step = ({ title, steps }: IStepProps) => {
  return (
    <div>
      <h5 className='text-lg font-semibold'>{title}</h5>
      <ol className='pl-8 mb-4'>
        {steps.map((step, index: number) => {
          return (
            <li key={index} className='list-disc '>
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Step;

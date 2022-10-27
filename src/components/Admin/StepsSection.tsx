import * as React from 'react';
import { useState } from 'react';
import Step from '../Admin/Step/Step';
import StepDropdown from './Step/StepDropdown';
import StepForm from './Step/StepForm';

interface Step {
  blogPostId: number;
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}

interface IStepsSectionProps {}

interface Step {
  blogPostId: number;
  id: number;
  title: string;
  index: number;
  bullets: { id: number; text: string }[];
  code: string;
}

interface Steps {
  steps: Step[] | null;
  blogPostId: number;
}

const StepsSection: React.FunctionComponent<Steps> = ({
  steps,
  blogPostId,
}: Steps) => {
  const [selectStep, setSelectStep] = useState<Step | null>(null);

  React.useEffect(() => {
    if (steps) {
      setSelectStep(steps[0]);
    }
  }, [steps]);

  const stepFormChangeHandler = (step: Step | null) => {
    setSelectStep((prev) => step);
  };

  return (
    <section className='flex flex-col  gap-10'>
      <StepDropdown
        steps={steps}
        selectedStep={selectStep}
        onChange={setSelectStep}
      />
      <div className='flex gap-20'>
        <Step stepCount={steps?.length ?? 0} step={selectStep} />
        <StepForm
          stepCount={steps?.length ?? 0}
          step={selectStep}
          onChange={stepFormChangeHandler}
          blogPostId={blogPostId}
        />
      </div>
    </section>
  );
};

export default StepsSection;

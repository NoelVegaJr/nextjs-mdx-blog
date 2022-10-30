import { motion } from 'framer-motion';
import * as React from 'react';

interface ITabProps {
  type: string;
  name: string;
  index: number;
  isOpen: boolean;
  open: (index: number) => void;
  close: (index: number) => void;
}

const Tab: React.FunctionComponent<ITabProps> = ({
  type,
  index,
  name,
  isOpen,
  open,
  close,
}: ITabProps) => {
  return (
    <div key={index} className=''>
      <li
        className={`${
          isOpen && 'bg-slate-200'
        } flex w-fit cursor-pointer gap-2 rounded-t border border-t border-l border-r border-slate-400 py-2 px-4 font-semibold`}
        onClick={() => open(index)}
      >
        <p>{`${name}`}</p>
        <div
          className='self-start text-red-700'
          onClick={(e) => {
            e.stopPropagation();
            close(index);
          }}
        >
          x
        </div>
      </li>
      {isOpen ? (
        <motion.div
          className={`h-0.5 w-full bg-orange-500`}
          layoutId='underline'
        />
      ) : null}
    </div>
  );
};

export default Tab;

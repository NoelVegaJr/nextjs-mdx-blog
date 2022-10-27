import * as React from 'react';

interface ISubNavProps {
  setView: (view: string) => void;
}

const SubNav: React.FunctionComponent<ISubNavProps> = ({
  setView,
}: ISubNavProps) => {
  return (
    <div className='mt-10 flex justify-evenly overflow-hidden rounded '>
      <button
        onClick={() => setView('newPost')}
        className='w-1/2 p-2 transition-all duration-300 hover:bg-slate-200'
      >
        New Post
      </button>
      <button
        onClick={() => setView('card')}
        className='w-1/2 p-2 transition-all duration-300 hover:bg-slate-200'
      >
        Card
      </button>
      <button
        onClick={() => setView('steps')}
        className='w-1/2 p-2 transition-all duration-300 hover:bg-slate-200'
      >
        Steps
      </button>
    </div>
  );
};

export default SubNav;

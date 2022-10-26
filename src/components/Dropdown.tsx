import autoAnimate from '@formkit/auto-animate';
import React from 'react';
import { useEffect, useState } from 'react';

interface IDropdown {
  children: JSX.Element | JSX.Element[];
}

const Dropdown = ({ children }: IDropdown) => {
  const [show, setShow] = useState(false);
  const parent = React.useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  return (
    <div ref={parent}>
      <>
        <button
          onClick={reveal}
          className='bg-slate-800 w-full p-4 text-white font-semibold text-lg rounded'
        >
          Create a new Blog Post
        </button>
        {show && <>{children}</>}
      </>
    </div>
  );
};

export default Dropdown;

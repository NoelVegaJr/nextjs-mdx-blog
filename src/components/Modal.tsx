import * as React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
interface IModalProps {
  children: JSX.Element | JSX.Element[];
}

const Backdrop: React.FunctionComponent<IModalProps> = (props) => {
  const [doc, setDoc] = useState<HTMLElement | null>();
  useEffect(() => {
    setDoc(document.getElementById('__next'));
  }, [doc]);

  if (!doc) {
    return <div />;
  }

  return createPortal(
    <div className='fixed top-0 z-10 h-screen w-full bg-black/20'>
      {props.children}
    </div>,
    doc!
  );
};

interface IModalProps {
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  return <Backdrop>{props.children}</Backdrop>;
};

export default Modal;

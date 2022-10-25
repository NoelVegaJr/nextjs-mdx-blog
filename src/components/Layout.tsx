import * as React from 'react';
import Nav from './Nav';

export interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function Layout({ children }: ILayoutProps) {
  return (
    <>
      <div className='h-screen w-screen mx-auto px-12'>
        <Nav />
        {children}
      </div>
    </>
  );
}

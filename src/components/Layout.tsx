import * as React from 'react';
import Nav from './Nav';

export interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function Layout({ children }: ILayoutProps) {
  return (
    <>
      <div className=' flex h-screen w-full flex-col'>
        <div className='mb-20'>
          <Nav />
        </div>

        <div className='min-h-0 w-full grow'>
          <div className='h-full w-full'>{children}</div>
        </div>
      </div>
    </>
  );
}

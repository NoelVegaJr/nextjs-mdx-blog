import * as React from 'react';
import Nav from './Nav';

export interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function Layout({ children }: ILayoutProps) {
  return (
    <>
      <div className=' flex h-screen w-full flex-col'>
        <div className='mb-32'>
          <Nav />
        </div>

        <div className='min-h-0 grow '>
          <div className='h-full'>{children}</div>
        </div>
      </div>
    </>
  );
}

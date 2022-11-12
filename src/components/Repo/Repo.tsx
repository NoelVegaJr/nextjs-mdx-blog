import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { TabsContext } from '../../context/tabs-context';
import RepoContent from './RepoContents';

interface IRepoProps {
  url: string;
}

const Repo: React.FunctionComponent<IRepoProps> = ({ url }: IRepoProps) => {
  const tabsCtx = useContext(TabsContext);


  
  return (
    <div className='h-full w-full'>
      {tabsCtx?.currOpenTab?.contentUrl && <RepoContent url={tabsCtx?.currOpenTab?.contentUrl}  />}
      
    </div>
  );
};

export default Repo;

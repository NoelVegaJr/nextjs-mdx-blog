import * as React from 'react';
import Image from 'next/image';
import { trpc } from '../../utils/trpc';
import { iconParser } from '../../utils/iconParser';
import { RepoDirectory } from '../../classes/Directory';
import { useContext, useEffect, useState } from 'react';
import { TabsContext } from '../../context/tabs-context';
import { createCrumbs } from '../../utils/createCrumbs';
import Crumbs from '../Crumbs';
interface IRepoContentsProps {
  url: string;
}

const RepoContents: React.FunctionComponent<IRepoContentsProps> = ({
  url,
}: IRepoContentsProps) => {
  const tabsCtx = useContext(TabsContext);
  const repo = trpc.getRepo.useQuery({
    url,
  });
  console.log(url)
  console.log(tabsCtx);
      
  return (
    <div className='rounded-lg border'>
      <Crumbs url={url}  />
      <div className='bg-slate-100 p-2'>Latest activity here</div>
      {repo?.data?.map((item: any, index: number) => {
        return (
          <li
            key={index}
            className='flex cursor-pointer list-none items-center gap-2 border-y border-slate-200 px-3 py-2 hover:bg-slate-100'
            onClick={() => {
              console.log(item.url);
              if (item.type === 'file') {
                console.log('open file');
                tabsCtx?.updateTab('file', item.name, item.url);
              } else {
                tabsCtx?.updateTab('dir', item.name, item.url);
              }
            }}
          >
            <Image
              src={iconParser(item.type, item.name)}
              alt='ext icon'
              width={16}
              height={16}
            />
            <p className=''>{item.name}</p>
          </li>
        );
      })}
    </div>
  );
};

export default RepoContents;

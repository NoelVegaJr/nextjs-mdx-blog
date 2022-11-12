import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RepoTree } from '../classes/RepoTree';
import { iconParser } from '../utils/iconParser';
import { trpc } from '../utils/trpc';
import Image from 'next/image';

interface IRepoDirProps {
  id: number;
  name: string;
  url: string;
  openFile: (file: any) => void;
  openRepo: (repo: any) => void;
  openRepoDir: (repo: any) => void;
}

const RepoContent: React.FunctionComponent<IRepoDirProps> = ({
  id,
  name,
  url,
  openFile,
  openRepo,
  openRepoDir,
}: IRepoDirProps) => {
  const repo = trpc.getRepo.useQuery({
    url: url,
  });

  useEffect(() => {
    if (repo.data) {
      console.log(repo.data);
    }
  }, [repo]);

  if (repo.error) {
    return <div>Error getting repo {url}</div>;
  }
  if (repo.isLoading) {
    return <div>Loading data</div>;
  }

  return (
    <div className=''>
      <h2 className='mb-6 text-3xl font-semibold'>{openTab?.data?.name}</h2>
      <div className='rounded-lg border'>
        <div className='bg-slate-100 p-2'>Latest activity here</div>

        {name &&
          repo.data &&
          // repo.data?.message !== 'This repository is empty.' &&
          repo?.data?.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className='flex cursor-pointer list-none items-center gap-2 border-y border-slate-200 px-3 py-2 hover:bg-slate-100'
                onClick={() => {
                  if (!item.url?.includes('/contents/')) {
                    openRepo(item);
                  } else {
                    if (item.type === 'dir') {
                      openRepoDir(item);
                    } else if (item.type === 'file') {
                      openFile(item);
                    }
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
    </div>
  );
};

export default RepoContent;

import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import NewBlogPostForm from './NewBlogPostForm';
import Modal from '../Modal';
import SideNavRepo from '../SideNavRepo';
import { RepoItem } from '../../classes/RepoTree';
import { TabsContext } from '../../context/tabs-context';
import { useUnmountEffect } from 'framer-motion';

interface ISidePostsNavProps {
  repos: any;
  activeRepo?: string;
  // activeRepo?: { id: number; name: string; url: string };
  // openRepo: (repo: { id: number; name: string; url: string }) => void;
  // openRepo: (repoUrl: string) => void;
}

const AdminSideNav: React.FunctionComponent<ISidePostsNavProps> = ({
  repos,
  // openRepo,
  activeRepo,
}) => {
  const tabsCtx = useContext(TabsContext);
  const [ddRepos, ddReposSet] = useState<boolean>(true);
  const [creatingNewBlogPost, isCreatingNewBlogPost] = useState(false);
  useEffect(() => {}, [tabsCtx]);

  return (
    <div className='border-right   h-full w-80 min-w-fit cursor-pointer  overflow-y-auto border bg-white'>
      <button
        onClick={() => isCreatingNewBlogPost(true)}
        className=' w-full  rounded p-2 px-2 text-left text-lg font-semibold'
      >
        New Post
      </button>
      {creatingNewBlogPost && (
        <Modal>
          <div className='grid h-full place-content-center'>
            <NewBlogPostForm onClose={() => isCreatingNewBlogPost(false)} />
          </div>
        </Modal>
      )}
      <div className='border-bottom  border py-2'>
        <div
          className='flex items-center justify-between px-2 text-lg font-semibold'
          onClick={() => {
            ddReposSet(!ddRepos);
          }}
        >
          <p className='text-black'>Repos</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`h-6 w-6 ${ddRepos && 'rotate-90'} hover:cursor-pointer`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </div>
        {ddRepos &&
          repos &&
          repos?.map((repo: any, index: number) => {
            return (
              <SideNavRepo
                key={repo.id}
                index={index}
                repoName={repo.name}
                isActive={repo.name === activeRepo}
                onClick={() => {
                  // openRepo(repo.url + '/contents');
                  tabsCtx?.newTab({
                    type: 'root',
                    name: repo.name,
                    contentUrl: repo.url + '/contents' ,
                  });
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AdminSideNav;

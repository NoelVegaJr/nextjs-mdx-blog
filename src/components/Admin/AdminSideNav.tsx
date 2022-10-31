import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import NewBlogPostForm from './NewBlogPostForm';
import RepoDD from './SideNavigation/RepoDropDown';
import Modal from '../Modal';
import autoAnimate from '@formkit/auto-animate';
import { trpc } from '../../utils/trpc';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';

interface ISidePostsNavProps {
  repos: any;
  activeRepo?: { id: number; name: string; url: string };
  openRepo: (repo: { id: number; name: string; url: string }) => void;
}

const AdminSideNav: React.FunctionComponent<ISidePostsNavProps> = ({
  repos,
  openRepo,
  activeRepo,
}) => {
  const [ddRepos, ddReposSet] = useState<boolean>(true);
  const [creatingNewBlogPost, isCreatingNewBlogPost] = useState(false);
  return (
    <div className='border-right   h-full w-80 min-w-fit cursor-pointer border bg-white'>
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
      <div className='border-bottom border py-2'>
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
              <li
                key={index}
                className={`cursor-pointer list-none p-1 px-2 text-lg ${
                  repo.name === activeRepo && 'text-blue-400'
                }`}
                onClick={() => {
                  openRepo(repo);
                }}
              >
                <p
                  className={`${
                    repo.name === activeRepo
                      ? 'text-blue-600'
                      : 'text-slate-500'
                  } font-semibold`}
                >
                  {repo.name.slice(0, 20) +
                    (repo.name.length >= 20 ? '...' : '')}
                </p>
              </li>
            );
          })}
      </div>
    </div>
  );
};

export default AdminSideNav;

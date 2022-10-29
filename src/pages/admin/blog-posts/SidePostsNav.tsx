import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import NewBlogPostForm from '../../../components/Admin/NewBlogPostForm';
import StepDropDown from '../../../components/Admin/SideNavigation/StepDropDown';
import Modal from '../../../components/Modal';
import autoAnimate from '@formkit/auto-animate';

interface ISidePostsNavProps {
  posts: any;
  setPostId: Dispatch<SetStateAction<number | undefined>>;
}

const SidePostsNav: React.FunctionComponent<ISidePostsNavProps> = ({
  posts,
  setPostId,
}) => {
  const [ddPosts, ddPostsSet] = useState<boolean>(true);
  const [creatingNewBlogPost, isCreatingNewBlogPost] = useState(false);
  const parent = React.useRef(null);

  React.useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className='border-right   h-full w-80 min-w-fit border bg-white'>
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
          ref={parent}
          onClick={() => {
            ddPostsSet(!ddPosts);
          }}
        >
          <p className='text-blue-600'>Posts</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`h-6 w-6 ${ddPosts && 'rotate-90'} hover:cursor-pointer`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </div>
        {ddPosts &&
          posts &&
          posts.map((post: any) => {
            return (
              <li
                key={post.id}
                className='cursor-pointer list-none p-1 px-2 text-lg '
                onClick={() => {
                  setPostId(post.id);
                }}
              >
                <StepDropDown title={post.title} steps={post.steps} />
              </li>
            );
          })}
      </div>
    </div>
  );
};

export default SidePostsNav;

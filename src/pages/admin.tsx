import { useState } from 'react';
import { trpc } from '../utils/trpc';
import Link from 'next/link';

import NewBlogPostForm from '../components/Admin/NewBlogPostForm';

interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const [creatingNewBlogPost, isCreatingNewBlogPost] = useState(false);
  const blogPosts = trpc.getBlogPosts.useQuery();

  return (
    <>
      {!creatingNewBlogPost ? (
        <button
          onClick={() => isCreatingNewBlogPost(true)}
          className='w-full rounded bg-slate-800 p-4 text-lg font-semibold text-white '
        >
          Create a new Blog Post
        </button>
      ) : (
        <NewBlogPostForm />
      )}
      {!blogPosts.data ? (
        <div>loading</div>
      ) : (
        <div>
          {blogPosts.data.map((blogPost: any) => {
            return (
              <li key={blogPost.id}>
                <Link href={'/admin/blog-posts/' + blogPost.id}>
                  {blogPost.title}
                </Link>
              </li>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Admin;

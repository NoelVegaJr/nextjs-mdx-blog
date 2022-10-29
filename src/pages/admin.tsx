import { useContext, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import SidePostsNav from './admin/blog-posts/SidePostsNav';
import BlogPost from '../components/BlogPost/BlogPost';
import { IBlogPost } from '../types/BlogPost';
import { UserContext } from '../context/user-context';
import EdittableBlogPost from '../components/BlogPost/EdittableBlogPost';

interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const userCtx = useContext(UserContext);
  const posts = trpc.getBlogPostsByUser.useQuery({ email: userCtx.email });
  const [postId, setPostId] = useState<number>();
  const [viewingPost, viewingPostSet] = useState<IBlogPost | null>(null);
  useEffect(() => {
    const chosenPost = posts.data?.find((post) => post.id === postId);
    if (chosenPost) {
      viewingPostSet(chosenPost);
    }

    if (!postId && posts.data) {
      setPostId(posts.data[0]?.id);
    }
  }, [postId, posts.data]);

  useEffect(() => {});

  posts?.data?.map((post) => console.log(post));

  if (!posts.data) {
    return <div>Loading</div>;
  }
  return (
    <div className=' relative flex h-full w-full '>
      <SidePostsNav posts={posts.data} setPostId={setPostId} />

      {viewingPost && <EdittableBlogPost {...viewingPost} />}
      {/* 
        <button className=' w-full bg-green-600  p-4 text-center text-xl font-bold text-white'>
          Add Step
        </button> */}

      {/* <div className='h-52 w-full border'></div> */}
    </div>
  );
};

export default Admin;

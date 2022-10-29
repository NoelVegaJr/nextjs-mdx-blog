import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';
import { useState } from 'react';
import StepsSection from '../../../components/Admin/StepsSection';
import BlogCard from '../../../components/Admin/BlogCard';
import SubNav from '../../../components/Admin/SubNav';

const AdminPostPage = () => {
  const router = useRouter();
  const [view, setView] = useState('card');

  const { slug: id } = router.query;

  const post = trpc.getBlogPostsById.useQuery({ id: Number(id) });
  console.log(post.data);

  if (!post.data) {
    return <div>Loading</div>;
  }

  return (
    <div className='flex flex-col gap-6'>
      <SubNav setView={setView} />

      {view === 'steps' && post?.data?.steps && (
        <StepsSection
          steps={post?.data?.steps ?? null}
          blogPostId={Number(id)}
        />
      )}
      {/* {view === 'newPost' && <NewBlogPostForm />} */}
      {view === 'card' && <BlogCard {...post.data} />}
    </div>
  );
};

export default AdminPostPage;

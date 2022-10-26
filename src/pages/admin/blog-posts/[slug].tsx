import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';
import Image from 'next/image';
import Input from '../../../components/Input';
import NewBlogPostForm from '../../../components/Admin/NewBlogPostForm';

const AdminPostPage = () => {
  const router = useRouter();
  const { slug: id } = router.query;
  if (!id) {
    router.push('/');
    return;
  }
  console.log(Number(id));
  const post = trpc.getBlogPostsById.useQuery({ id: Number(id) });

  console.log('rendering post page');
  console.log(id);

  return (
    <div>
      <NewBlogPostForm />
    </div>
  );
};

export default AdminPostPage;

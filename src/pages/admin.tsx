import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import AdminSideNav from '../components/Admin/AdminSideNav';
import RepoFile from '../components/RepoFile';
import { UserSessionContext } from '../context/user-context';
import Profile from '../components/Profile/Profile';
import Repo from '../components/Repo/Repo';
import { TabsContext } from '../context/tabs-context';
import Tabs from '../components/Tabs';
import { cleanGitHubUrl } from '../utils/CleanGitHubApiUrl';

interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const userCtx = useContext(UserSessionContext);
  const tabsCtx = useContext(TabsContext);
  const userRepos = trpc.getUserRepos.useQuery({ username: 'NoelVegaJr' });
  const [openRepo, setOpenRepo] = useState<string>();

  if (userRepos.isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className='  flex h-full w-full '>
      <AdminSideNav repos={userRepos.data} activeRepo={openRepo} />
      <div className=' flex w-full flex-col'>
        <nav className='border border-blue-600 p-2'>
          <Tabs />
        </nav>
        <div className='mx-auto flex w-full grow flex-col border border-green-600 '>
          {/* <p className='mb-4 flex gap-1'>
              {tabs.?.data && (
                <Crumbs url={cleanGitHubUrl(openTab.contentUrl)} />
              )}
            </p> */}
          <AnimatePresence mode='wait'>
            <motion.div
              className='h-full w-full'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tabsCtx?.currOpenTab && (
                <>
                  {tabsCtx?.currOpenTab.type === 'profile' && <Profile />}
                  {tabsCtx?.currOpenTab?.type === 'file' && (
                    <RepoFile url={tabsCtx?.currOpenTab.contentUrl} />
                  )}
                  {(tabsCtx?.currOpenTab?.type === 'root' ||
                    tabsCtx?.currOpenTab?.type === 'dir') && (
                    <Repo url={tabsCtx?.currOpenTab.contentUrl} />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* {viewingPost && <EdittableBlogPost {...viewingPost} />} */}
      {/* 
        <button className=' w-full bg-green-600  p-4 text-center text-xl font-bold text-white'>
          Add Step
        </button> */}

      {/* <div className='h-52 w-full border'></div> */}
    </div>
  );
};

export default Admin;

import { useContext, useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import AdminSideNav from '../components/Admin/AdminSideNav';
import { IBlogPost } from '../types/BlogPost';
import { UserContext } from '../context/user-context';
import EdittableBlogPost from '../components/BlogPost/EdittableBlogPost';
import Repo from '../components/Admin/Repo/Repo';
import { REPL_MODE_SLOPPY } from 'repl';
import RepoContent from '../components/Admin/Repo/RepoContent';
import Tab from '../components/Admin/Tabs';
import path from 'path';

interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const userRepos = trpc.getUserRepos.useQuery({ username: 'NoelVegaJr' });
  const [tabIndex, setTabIndex] = useState(0);
  const [openRepo, setOpenRepo] = useState('');
  const [currentPath, setCurrentPath] = useState<string>('');
  const [openFile, setOpenFile] = useState<{
    name: string;
    url: string;
    size: number;
    path: string;
  }>();
  const [tabs, setTabs] = useState<any[]>([]);
  const [openTab, setOpenTab] = useState<any>();
  const [selectedRootTab, setSelectedRootTab] = useState('');
  const repo = trpc.getRepo.useQuery({
    owner: 'NoelVegaJr',
    repo: openRepo,
  });

  const closeTabHandler = (index: number) => {
    const newTabs = [...tabs.filter((tab) => tab.index !== index)];
    console.log(newTabs);
    console.log(newTabs[newTabs.length - 1]);
    setTabs(newTabs);
    setOpenTab(newTabs[newTabs.length - 1]);
  };

  const openRepoHandler = (repo: string) => {
    const alreadyOpen = tabs.filter(
      (tab) => tab.type === 'dir' && tab.name === repo
    );
    if (alreadyOpen.length > 0) return;

    setTabIndex((prev) => prev + 1);
    setOpenRepo(repo);
    const newTab = { type: 'dir', index: tabIndex, name: repo };
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    console.log('SETTING NEW TAB: ', newTab);
    setOpenTab(newTab);
  };

  const openFileHandler = (file: {
    name: string;
    content: string;
    url: string;
    size: number;
    path: string;
  }) => {
    const cleanUrl = file.url.replace('?ref=main', '');
    console.log('CLEANED URL', cleanUrl);
    const files = tabs.filter((tab) => tab.type === 'file');
    console.log(files);
    console.log(files.map((file) => file.data.url));
    if (files.map((file) => file.data.url).includes(cleanUrl)) return;

    setTabIndex((prev) => prev + 1);

    setOpenFile((prev) => {
      return {
        name: file.name,
        url: cleanUrl,
        size: file.size,
        path: file.path,
      };
    });

    const newTab = {
      type: 'file',
      index: tabIndex,
      name: file.name,
      data: { ...file, url: cleanUrl },
    };
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setOpenTab(newTab);
  };

  const openTabHandler = (index: number) => {
    const tab = tabs.find((tab) => tab.index === index);
    setOpenTab(tab);
  };

  if (userRepos.isLoading) {
    return <div>Loading</div>;
  }

  if (repo.error) {
    return <div>error</div>;
  }
  console.log('OPEN TAB: ', openTab);
  return (
    <div className='  flex h-full w-full '>
      <AdminSideNav
        repos={userRepos.data}
        openRepo={openRepoHandler}
        setPath={setCurrentPath}
        activeRepo={openRepo}
      />
      <div className=' w-full'>
        <nav className='p-2'>
          <ul className='flex'>
            {tabs?.map((tab) => (
              <div key={tab.index} className=''>
                <Tab
                  type={tab.type ? tab.type : 'dir'}
                  index={tab.index}
                  name={tab.name}
                  isOpen={tab.index === openTab.index}
                  open={openTabHandler}
                  close={closeTabHandler}
                />
              </div>
            ))}
          </ul>
        </nav>
        <div className='mx-auto mt-8 flex w-full max-w-3xl grow flex-col gap-8'>
          <h2 className='text-3xl'>{openRepo}</h2>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedRootTab ? selectedRootTab : 'empty'}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!currentPath ? (
                <Repo
                  name={openRepo}
                  setPath={setCurrentPath}
                  path={currentPath}
                  openFile={openFileHandler}
                />
              ) : (
                <RepoContent
                  openFile={openFileHandler}
                  repoName={openRepo}
                  path={currentPath}
                  setPath={setCurrentPath}
                />
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

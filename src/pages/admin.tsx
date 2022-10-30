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

interface IAdminProps {}

function Accordion() {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      layout
      style={{ height: isOpen ? '100px' : '500px' }}
      onClick={() => setOpen(!isOpen)}
    />
  );
}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const [tabs, setTabs] = useState<string[]>([]);
  const userRepos = trpc.getUserRepos.useQuery({ username: 'NoelVegaJr' });
  const [selectedRepo, setSelectedRepo] = useState('');
  const [file, setFile] = useState('');
  const [selectedRootTab, setSelectedRootTab] = useState('');
  const [selectedTab, setSelectedTab] = useState('');
  const repo = trpc.getRepo.useQuery({
    owner: 'NoelVegaJr',
    repo: selectedRepo,
  });
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    setSelectedRootTab(selectedRepo);
  }, [selectedRepo]);

  useEffect(() => {
    if (file) {
      setTabs((prev) => [...prev, file]);
      setSelectedTab(file);
    }
  }, [file]);

  if (!repo.data) {
    return <div>Loading...</div>;
  }
  if (repo.error) {
    return <div>error</div>;
  }
  console.log(selectedTab);
  return (
    <div className='  flex h-full w-full '>
      <AdminSideNav
        repos={userRepos.data}
        setRepo={setSelectedRepo}
        setPath={setPath}
        activeRepo={selectedRepo}
      />
      <div className=' w-full'>
        <nav className='p-2'>
          <ul className='flex'>
            {tabs.map((item) => (
              <div key={item} className=''>
                <li
                  className={`${
                    selectedTab === selectedTab && 'bg-slate-200'
                  } flex w-fit cursor-pointer gap-2 rounded-t border border-t border-l border-r border-slate-400 py-2 px-4 font-semibold`}
                  onClick={() => setSelectedTab(item)}
                >
                  <p>{`${item}`}</p>
                  <div
                    className='self-start text-red-700'
                    onClick={() => {
                      setTabs((prev) => [
                        ...tabs.filter((tab) => tab !== item),
                      ]);
                    }}
                  >
                    x
                  </div>
                </li>
                {item === selectedTab || tabs.length === 1 ? (
                  <motion.div
                    className={`h-0.5 w-full bg-orange-500`}
                    layoutId='underline'
                  />
                ) : null}
              </div>
            ))}
          </ul>
        </nav>
        <div className='mx-auto mt-8 flex w-full max-w-3xl grow flex-col gap-8'>
          <h2 className='text-3xl'>{selectedRepo}</h2>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedRootTab ? selectedRootTab : 'empty'}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!path ? (
                <Repo
                  name={selectedRepo}
                  setPath={setPath}
                  path={path}
                  setFile={setFile}
                />
              ) : (
                <RepoContent
                  repoName={selectedRepo}
                  path={path}
                  setPath={setPath}
                  setFile={setFile}
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

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import AdminSideNav from '../components/Admin/AdminSideNav';
import Tab from '../components/Admin/Tabs';
import RepoFile from '../components/RepoFile';
import RepoContent from '../components/RepoDir';
import { cleanGitHubUrl } from '../utils/CleanGitHubApiUrl';
import Crumbs from '../components/Crumb';

interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const userRepos = trpc.getUserRepos.useQuery({ username: 'NoelVegaJr' });
  const [tabIndex, setTabIndex] = useState(0);
  const [openRepo, setOpenRepo] = useState<{
    id: number;
    name: string;
    url: string;
  }>();

  const [tabs, setTabs] = useState<any[]>([]);
  const [openTab, setOpenTab] = useState<any>();

  const closeTabHandler = (index: number) => {
    const newTabs = [...tabs.filter((tab) => tab.index !== index)];
    setTabs(newTabs);
    setOpenTab(newTabs[newTabs.length - 1]);
  };

  const openRepoDirHandler = (repo: {
    id: number;
    name: string;
    url: string;
  }) => {
    const filteredTabs = tabs.filter(
      (tab) => tab.index !== openTab.index
    ) as any[];
    const newTab = { ...openTab, data: { ...repo, url: repo.url } };
    const newTabs = [...filteredTabs, newTab];
    setTabs(newTabs);
    setOpenTab(newTab);
  };

  const openRepoHandler = (repo: { id: number; name: string; url: string }) => {
    const alreadyOpen = tabs.filter(
      (tab) => tab.type === 'dir' && tab.name === repo
    );
    if (alreadyOpen.length > 0) return;

    setTabIndex((prev) => prev + 1);
    setOpenRepo(repo);
    const newTab = {
      type: 'dir',
      index: tabIndex,
      data: { ...repo, url: repo.url.split('?')[0] },
    };
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setOpenTab(newTab);
  };

  const openFileHandler = async (file: {
    name: string;
    content: string;
    url: string;
    size: number;
    path: string;
  }) => {
    const cleanUrl = file.url.replace('?ref=main', '');
    const files = tabs.filter((tab) => tab.type === 'file');
    if (files.map((file) => file.data.url).includes(cleanUrl)) return;

    setTabIndex((prev) => prev + 1);

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

  const breadCrumbClickHandler = (url: string) => {
    console.log(tabs);
    console.log(url);
    const existingTab = tabs.find((tab) => {
      return cleanGitHubUrl(tab.data.url) === url;
    });

    if (existingTab) {
      console.log('switch tab');
      setOpenTab(existingTab);
    } else {
      console.log('change path of existing tab');
    }

    console.log(existingTab);
    // console.log(tabs);
    // const filteredTabs = tabs.filter(
    //   (tab) => tab.index !== openTab.index
    // ) as any[];
    // console.log('Other open tabs: ', filteredTabs);
    // if (openTab.type === 'file') {
    //   const tab = tabs.find((tab) => {
    //     if (tab.data.url === url) {
    //     }
    //     return cleanGitHubUrl(tab.data.url) === url;
    //   });
    //   setOpenTab(tab);
    //   return;
    // }
    // const newTab = {
    //   ...openTab,
    //   type: 'dir',
    //   data: { ...openTab.data, url: url },
    // };
    // const newTabs = [...filteredTabs, newTab];
    // setTabs(newTabs);
    // setOpenTab(newTab);
  };

  if (userRepos.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className='  flex h-full w-full '>
      <AdminSideNav
        repos={userRepos.data}
        openRepo={openRepoHandler}
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
                  name={tab.data.name}
                  isOpen={tab.index === openTab.index}
                  open={openTabHandler}
                  close={closeTabHandler}
                />
              </div>
            ))}
          </ul>
        </nav>
        <div className='mx-auto mt-8 flex w-full max-w-3xl grow flex-col '>
          <h2 className='mb-6 text-3xl font-semibold'>{openTab?.data?.name}</h2>
          <p className='mb-4 flex gap-1'>
            {openTab?.data && (
              <Crumbs url={cleanGitHubUrl(openTab.data.url)} />
              // <span>
              //   {cleanGitHubUrl(openTab.data.url)
              //     .split('/')
              //     .slice(5, 10)
              //     .join('/')}
              // </span>
            )}
            {/* {openTab &&
              cleanGitHubUrl(openTab?.data.url)
                .split('/')
                .slice(5, 10)
                .map((crumb: string, index: number) => {
                  return (
                    <Crumb
                      key={crumb}
                      url={
                        cleanGitHubUrl(openTab.data.url)
                          .split('/')
                          .slice(0, 6)
                          .join('/') +
                        '/' +
                        crumb
                      }
                    />
                    <>
                      <span
                        key={Math.random()}
                        className='cursor-pointer font-semibold hover:text-blue-500'
                        onClick={() => {
                          let url = '';
                          let foundCrumb = false;
                          cleanGitHubUrl(openTab.data.url)
                            .split('/')
                            .forEach((urlFrag) => {
                              if (!foundCrumb) {
                                if (urlFrag !== crumb) {
                                  url += urlFrag + '/';
                                } else {
                                  url += urlFrag;
                                  foundCrumb = true;
                                }
                              }
                            });
                          breadCrumbClickHandler(url);
                        }}
                      >
                        {crumb}
                      </span>
                      <span key={Math.random()}>/</span>
                    </>
                  );
                })} */}
          </p>
          <AnimatePresence mode='wait'>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {openTab && (
                <>
                  {openTab?.type === 'file' && (
                    <RepoFile url={openTab.data.url} />
                  )}
                  {openTab?.type === 'dir' && (
                    <RepoContent
                      id={openTab.data.id}
                      name={openTab.data.name}
                      url={openTab.data.url}
                      openRepo={openRepoHandler}
                      openRepoDir={openRepoDirHandler}
                      openFile={openFileHandler}
                    />
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

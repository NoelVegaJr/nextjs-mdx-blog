import { url } from 'inspector';
import { createContext, SetStateAction, useEffect, useState } from 'react';

interface ITab {
  type: 'profile' | 'file' | 'dir' | 'root';
  name: string;
  index: number
  contentUrl: string;
}

interface ITabsContext {
  list: ITab[] | null;
  currOpenTab: ITab | null;
  closeTab: (index: number) => void;
  openTab: (index: number) => void;
  newTab: (tab: {
    type: 'profile' | 'file' | 'dir' | 'root';
    name: string;
    contentUrl: string;
  }) => void;
  updateTab: (
    type: 'profile' | 'file' | 'dir' | 'root',
    name: string,
    contentUrl: string
  ) => void;
}

export const TabsContext = createContext<ITabsContext | null>(null);

export const TabsProvider = (props: any) => {
  const [tabs, setTabs] = useState<ITab[] | null>(null);
  const [openTab, setOpenTab] = useState<ITab | null>(null);

  const closeTabHandler = (index: number) => {
    tabs?.filter((tab) => {
      console.log(tab);
    });
    const newTabs = [...tabs!.filter((tab) => tab.index !== index)];
    setTabs(newTabs);
    setOpenTab(newTabs[newTabs.length - 1]);
  };

  const openTabHandler = (index: number) => {
    const tab = tabs?.find((tab) => {
      return tab.index === index;
    });

    if (tab) setOpenTab(tab);
  };

  const newTabHandler = (tab: {
    type: 'profile' | 'file' | 'dir' | 'root';
    name: string;
    contentUrl: string;
  }) => {
    if (!tabs || tabs.find((t) => tab.contentUrl === t.contentUrl)) {
      setTabs(tabs);
      return;
    }

    const newTab = { ...tab, index: Math.random() };

    setTabs([...tabs, newTab]);
    setOpenTab(newTab);
  };

  const updateTabHandler = (
    type: 'profile' | 'file' | 'dir' | 'root',
    name: string,
    contentUrl: string,
  ) => {
    console.log('content URL: ', contentUrl);
    if (!openTab) return;
    const filteredTabs = tabs?.filter((tab) => tab.index !== openTab?.index);
    const updatedOpenTab = { type, name, contentUrl, index: openTab.index };

    setOpenTab(updatedOpenTab);

    if (!filteredTabs) {
      setTabs([updatedOpenTab]);
    } else {
      setTabs([...filteredTabs, updatedOpenTab]);
    }
  };

  useEffect(() => {
    setOpenTab({ type: 'profile', name: 'profile', index: 0, contentUrl: '' });
    setTabs([{ type: 'profile', name: 'profile', index: 0, contentUrl: '' }]);
  }, []);


  return (
    <TabsContext.Provider
      value={{
        list: tabs,
        currOpenTab: openTab,
        openTab: (index: number) => openTabHandler(index),
        closeTab: (index: number) => closeTabHandler(index),
        newTab: (tab: {
          type: 'profile' | 'file' | 'dir' | 'root';
          name: string;
          contentUrl: string;
        }) => newTabHandler(tab),
        updateTab: (
          type: 'profile' | 'file' | 'dir' | 'root',
          name: string,
          contentUrl: string,
        ) => updateTabHandler(type, name,  contentUrl),
      }}
    >
      {props.children}
    </TabsContext.Provider>
  );
};

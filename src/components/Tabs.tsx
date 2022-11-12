import * as React from 'react';
import { useContext } from 'react';
import { TabsContext } from '../context/tabs-context';
import Image from 'next/image';
import { iconParser } from '../utils/iconParser';

interface ITabsProps {}

const Tabs: React.FunctionComponent<ITabsProps> = (props) => {
  const tabsCtx = useContext(TabsContext);

  return (
    <ul className='flex'>
      {tabsCtx?.list?.map((tab, index: number) => {
        return (
          <li
            key={index}
            className={`flex w-fit cursor-pointer gap-2 rounded-t border border-t border-l border-r border-slate-400 py-2 px-4 font-semibold`}
            onClick={() => tabsCtx.openTab(tab.index)}
          >
            <div className='flex items-center gap-2'>
              <Image
                src={iconParser(tab.type, tab.name)}
                alt='file ext'
                width={14}
                height={14}
              />
              {tab.name}
            </div>
            <div
              className='self-start text-red-700'
              onClick={(e) => {
                e.stopPropagation();
                tabsCtx.closeTab(tab.index);
              }}
            >
              x
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;

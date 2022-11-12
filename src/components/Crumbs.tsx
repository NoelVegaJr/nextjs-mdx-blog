import * as React from 'react';
import { useContext } from 'react';
import { TabsContext } from '../context/tabs-context';
import { cleanGitHubUrl } from '../utils/CleanGitHubApiUrl';
import { createCrumbs } from '../utils/createCrumbs';

interface ICrumbsProps {
  url: string;
}


const Crumbs: React.FunctionComponent<ICrumbsProps> = ({ url  }: ICrumbsProps) => {
  const tabsCtx = useContext(TabsContext);
  const crumbs = createCrumbs(cleanGitHubUrl(url));
  return (
    <ul className='flex '>
      {crumbs.map((crumb, index) => {
        return (
          <li key={index} className='flex text-xl text-blue-600 ' onClick={() => {
            tabsCtx?.updateTab('root', crumb.name, crumb.url);
            }}>
            <span
              className={`${crumbs.length === index + 1 && crumbs.length > 1 && 'font-semibold'} cursor-pointer`}
            >
              {crumb.name}
            </span>
            <span className={` px-1 text-neutral-500`}>
              {crumbs.length !== index + 1 && ' / '}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Crumbs;

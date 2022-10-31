import * as React from 'react';

interface ISideNavRepoProps {
  index: number;
  repoName: string;
  isActive: boolean;
  onClick: () => void;
}

const SideNavRepo: React.FunctionComponent<ISideNavRepoProps> = ({
  index,
  repoName,
  isActive,
  onClick,
}: ISideNavRepoProps) => {
  return (
    <li
      key={index}
      className={`cursor-pointer list-none p-1 px-2 text-lg ${
        isActive && 'text-blue-400'
      }`}
      onClick={() => {
        onClick();
      }}
    >
      <p
        className={`${
          isActive ? 'text-blue-600' : 'text-slate-500'
        } font-semibold`}
      >
        {repoName.slice(0, 20) + (repoName.length >= 20 ? '...' : '')}
      </p>
    </li>
  );
};

export default SideNavRepo;

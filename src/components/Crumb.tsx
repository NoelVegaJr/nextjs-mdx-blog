import * as React from 'react';
import { cleanGitHubUrl } from '../utils/CleanGitHubApiUrl';

interface ICrumbProps {
  // onClick: () => void;
  url: string;
  // currentUrl: string;
}

const Crumbs: React.FunctionComponent<ICrumbProps> = ({
  // onClick,
  url,
}: // currentUrl,
ICrumbProps) => {
  const baseUrl = url.split('/').slice(0, 5).join('/');
  const crumbs = url.split('/').slice(5, url.split('/').length);
  // console.log('FULL URL: ', url);
  // console.log('BASE URL: ', baseUrl);
  // console.log('CRUMBS: ', crumbs);

  const clickHandler = (crumb: string) => {
    const repoContentsUrl = baseUrl + crumb;
    // console.log(repoContentsUrl);
  };

  return (
    <>
      {crumbs.map((crumb) => {
        return (
          <span key={crumb} onClick={() => clickHandler(crumb)}>
            {crumb}
          </span>
        );
      })}
    </>
  );
};

export default Crumbs;

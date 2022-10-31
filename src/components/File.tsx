import * as React from 'react';
import { trpc } from '../utils/trpc';
interface IRepoFileProps {
  url: string;
}

const RepoFile: React.FunctionComponent<IRepoFileProps> = ({ url }) => {
  console.log('REPOFILE Url:');
  const repoFile = trpc.getFileContent.useQuery({ url });

  if (repoFile.isError) {
    return <div>Error</div>;
  }

  if (!repoFile.data) {
    return <div>Loading</div>;
  }
  return <div>{repoFile.data}</div>;
};

export default RepoFile;

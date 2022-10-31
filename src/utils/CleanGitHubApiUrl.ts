export const cleanGitHubUrl = (url: string) => {
  return url.split('?')[0];
};

export const cleanGitHubUrl = (url: string) => {
  console.log(url)
  return url.split('?')[0];
};

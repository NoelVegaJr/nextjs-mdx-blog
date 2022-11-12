
interface ICrumb {
  name: string; 
  url: string;
}


export function createCrumbs(ghApiUrl: string): ICrumb[] {
  // https://api.github.com/repos/NoelVegaJr/nextjs-mdx-blog/contents/src/pages/api
  console.log('GH API URL Crumb', ghApiUrl)
  const urlParts = ghApiUrl.split('/');
  const username = urlParts[4];
  const repoName = urlParts[5];
  const baseUrl = 'https://api.github.com/repos/' + username + '/'+ repoName +'/contents/';
  const destinations = ghApiUrl.split('/contents/')[1]?.split('/');
  const crumbs = [{name: repoName, url: baseUrl}]
  if(destinations) {
    destinations.forEach((destination, index) =>  {
      const url = baseUrl + destinations.slice(0, index + 1).join('/')
      crumbs.push({ name: destination, url: url})
    })

  }

  return crumbs
  
}


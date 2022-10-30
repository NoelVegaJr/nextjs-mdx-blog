import { useEffect, useState } from 'react';
import getCurrentLine from 'get-current-line';

//  https://api.github.com/repos/OWNER/REPO/contents/PATH

const useFork = (username: string, repo: string, path: string) => {
  // const [start, setStart] = useState(getCurrentLine());
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const decodeFileBase64 = (base64String: string) => {
    return decodeURIComponent(
      atob(base64String)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2));
        })
        .join('')
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`)
      .then((res) => res.json())
      .then((data) => {
        const base64String = data.content;
        // console.log(base64String);
        // console.log(decodeFileBase64(base64String));
        const decodeBase64 = decodeFileBase64(
          base64String.substring(base64String.indexOf(',') + 1)
        );
        console.log(data.content);
        setCode(data.content);
        setIsLoading(false);
      });
  }, [username, repo, path]);

  return { isLoading, code };
};

export default useFork;

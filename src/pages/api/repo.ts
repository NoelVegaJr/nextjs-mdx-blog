import { NextApiRequest, NextApiResponse } from 'next';
import { formatBase64 } from '../../utils/formatBase64';

function toBinary(string: string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

function fromBinary(encoded: string) {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, repo, path } = req.body;
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/${path}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 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',
      },
    }
  );
  const data = await response.json();
  console.log('github data: ', data);
  const base64String = data.content;

  const result = formatBase64(base64String);
  console.log(result);
  return res.json({ content: result });
};

export default handler;

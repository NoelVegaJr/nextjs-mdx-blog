export const iconParser = (type: string, name: string) => {
  let image = '';
  if (type === 'file') {
    switch (name.split('.')[name.split('.').length - 1]) {
      case 'js':
        image = '/javascript.png';
        break;
      case 'tsx':
        image = '/react.png';
        break;
      case 'html':
        image = '/html.png';
        break;
      case 'css':
        image = '/css3.png';
        break;
      case 'json':
        image = '/brackets.png';
        break;
      default:
        image = '/file.png';
    }
  } else if (type === 'dir') {
    image = '/folder.png';
  }
  return image;
};

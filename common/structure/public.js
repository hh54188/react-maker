import FILE_TYPES from '../file-types.js';

const publics =  {
  name: 'public',
  type: FILE_TYPES.FOLDER,
  children: [
    {
      name: 'robots.txt',
    },
    {
      name: 'humans.txt',
    },
    {
      name: 'favicon.ico',
    },
    {
      name: 'crossdomain.xml',
    },
    {
      name: 'browserconfig.xml',
    }
  ],
};

export default publics;

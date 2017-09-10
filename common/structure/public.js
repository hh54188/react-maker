import FILE_TYPES from '../file-types.js';

const publics =  {
  name: 'public',
  type: FILE_TYPES.FOLDER,
  children: [
    {
      name: 'robots.txt',
      type: FILE_TYPES.FILE,
    },
    {
      name: 'humans.txt',
      type: FILE_TYPES.FILE,
    },
    {
      name: 'favicon.ico',
      type: FILE_TYPES.FILE,
    },
    {
      name: 'crossdomain.xml',
      type: FILE_TYPES.FILE,
    },
    {
      name: 'browserconfig.xml',
      type: FILE_TYPES.FILE,
    }
  ],
};

export default publics;

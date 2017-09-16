import FILE_TYPES from '../file-types.js';

const src = {
  name: 'src',
  type: FILE_TYPES.FOLDER,
  checked: true,
  expand: true,  
  children: [
    {
      name: 'components',
      type: FILE_TYPES.FOLDER,  
    },
    {
      name: 'middlewares',
      type: FILE_TYPES.FOLDER,
    },
    {
      name: 'actions',
      type: FILE_TYPES.FOLDER,  
    },
    {
      name: 'reducers',
      type: FILE_TYPES.FOLDER,  
    },
    {
      name: 'store.js',
    },
    {
      name: 'app.js',
      checked: true,
    }
  ]  
}

export default src;
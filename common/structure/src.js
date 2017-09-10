import FILE_TYPES from '../file-types.js';

const src = {
  name: 'public',
  type: FILE_TYPES.FOLDER,
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
      type: FILE_TYPES.FILE,        
    },
    {
      name: 'app.js',
      type: FILE_TYPES.FILE,        
    }
  ]  
}

export default src;
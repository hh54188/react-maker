import FILE_TYPES from './file-types.js';

import docs from './structure/docs.js';
import publics from './structure/public.js';
import src from './structure/src.js';
import otherFiles from './structure/other-files.js';

const appFolderStructure = {
  name: 'ReactApp',
  type: FILE_TYPES.FOLDER,
  children: [
    docs,
    publics,
    src,
    ...otherFiles,
  ],
};

export default appFolderStructure;
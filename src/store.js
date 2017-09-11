import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as _ from 'lodash';

import appFolderStructure from '../common/project-structure';
import reducer from './reducers';

const initialState = {
  appFolderStructure: _.cloneDeep(appFolderStructure),
};
const store = createStore(reducer, initialState,  applyMiddleware(thunk));

export default store;
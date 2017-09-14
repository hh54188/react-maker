import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as _ from 'lodash';

import appFolderStructure from 'common/project-structure';
import FILE_TYPES from 'common/file-types';
import { filterNode } from './util';
import reducer from 'reducers';

const initialCheckedKeys = [];
const initialExpandedKeys = [];

(function computeCheckedKeys(appFolderStructure, parentKeys = []) {
  const { name, type = FILE_TYPES.FILE, children, selected } = appFolderStructure;
  const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
  if (selected) {
    initialCheckedKeys.push(currentKeys.join('-'))
  }
  children && children.forEach((child) => {
    computeCheckedKeys(child, currentKeys);
  });
})(appFolderStructure);

(function computeExpandedKeys(appFolderStructure, parentKeys = []) {
  const { name, type = FILE_TYPES.FILE, children, expand } = appFolderStructure;
  const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
  if (expand) {
    initialExpandedKeys.push(currentKeys.join('-'))
  }
  children && children.forEach((child) => {
    computeExpandedKeys(child, currentKeys);
  });
})(appFolderStructure);

const searchContent = '';

const initialState = {
  appFolderStructure: filterNode(_.cloneDeep(appFolderStructure), searchContent),
  expandedKeys: [...initialExpandedKeys],
  checkedKeys: [...initialCheckedKeys],
  searchContent,
  options: {
    showChecked: false,
  }
};
const store = createStore(reducer, initialState,  applyMiddleware(thunk));

export default store;
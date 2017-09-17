import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appFolderStructure from 'common/project-structure';
import FILE_TYPES from 'common/file-types';
import { filterNodeBySearch } from './util';
import reducer from 'reducers';

const initialCheckedKeys = [];
const initialExpandedKeys = [];
const searchContent = '';

(function computeCheckedKeys(appFolderStructure, parentKeys = []) {
  const { name, type = FILE_TYPES.FILE, children, checked } = appFolderStructure;
  const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
  if (checked) {
    initialCheckedKeys.push(currentKeys.join('-'));
    // 如果当前选项被勾选
    // 则需要保证当前选项的父选项被勾选
    // 并且祖祖辈辈被勾选
    let currentKeysLength = currentKeys.length;
    while (currentKeysLength) {
      const parentKeyPairs = currentKeys.slice(0, currentKeysLength - 1);
      const parentKeyStr = parentKeyPairs.join('-');
      if (initialCheckedKeys.indexOf(parentKeyStr) < 0) {
        initialCheckedKeys.push(parentKeyStr);
      }
      currentKeysLength--;
    }    
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

console.log('initialExpandedKeys--->', initialExpandedKeys);
console.log('initialCheckedKeys--->', initialCheckedKeys);

const initialState = {
  appFolderStructure: filterNodeBySearch(appFolderStructure, searchContent),
  expandedKeys: initialExpandedKeys,
  checkedKeys: initialCheckedKeys,
  showCheckedOnly: false,
  searchContent,
};
const store = createStore(reducer, initialState,  applyMiddleware(thunk));

export default store;
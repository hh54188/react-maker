import {
  UPDATE_EXPANDED_KEYS,
  RECOMPUTE_EXPANDED_KEYS,
} from 'actions/actionTypes';

import FILE_TYPES from 'common/file-types';

import { filterNodeBySearch, resetNode } from '../util';

const nodeIsVisible = (node) => {
  const { children, invisible } = node;
  if (!children || !children.length) {
    return !!invisible;
  }

  if(children.some((child) => {
    return nodeIsVisible(child);
  })) {
    return true;
  } else {
    return false;
  }
}

export default function expandedKeys(state = [], action) {
  const { type: actionType, payload } = action;
 
  const getVisibleNodeKeys = (root, parentKeys = []) => {
    const { name, type = FILE_TYPES.FILE, children, expand } = root;
    const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
    const currentKeyStr = currentKeys.join('-');

    const isVisible = nodeIsVisible(root);
    if (isVisible && type === FILE_TYPES.FOLDER 
        && state.indexOf(currentKeyStr) < 0
        && children && children.length
      ) {
      state.push(currentKeyStr);
    }
    
    if (children && children.length) {
      children && children.forEach((child) => {
        getVisibleNodeKeys(child, currentKeys);
      });
    }
  }
 
  switch(actionType) {
    case RECOMPUTE_EXPANDED_KEYS:
      const { searchContent, appFolderStructure: folderTree } = payload;
      getVisibleNodeKeys(filterNodeBySearch(resetNode(folderTree), payload));
      return state;
    case UPDATE_EXPANDED_KEYS: return payload;
    default: return state;
  }
}
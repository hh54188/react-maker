import * as actionTypes from 'actions/actionTypes';

export const showCheckedOnly = (showCheckedOnly) => {
  return {
    type: actionTypes.TOGGLE_SHOW_CHECKED_ONLY,
    payload: showCheckedOnly,
  }
}

export const updateExpandedKeys = (expandedKeys) => {
  return {
    type: actionTypes.UPDATE_EXPANDED_KEYS,
    payload: expandedKeys,
  }
};

export const updateCheckedKeys = (checkedKeys) => {
  return {
    type: actionTypes.UPDATE_CHECKED_KEYS,
    payload: checkedKeys,
  }
};

export const changeSearchContent = (searchContent) => {
  return {
    type: actionTypes.CHANGE_SEARCH_CONTENT,
    payload: searchContent,
  }
}

export const filterTree = (filterContent, showCheckedOnly, checkedKeys) => {
  return {
    type: actionTypes.FILTER_TREE,
    payload: {
      filterContent,
      showCheckedOnly,
      checkedKeys,
    },
  }
}

export const reomputeExpandedKeys = (searchContent, appFolderStructure) => {
  return {
    type: actionTypes.RECOMPUTE_EXPANDED_KEYS,
    payload: {
      searchContent,
      appFolderStructure,
    },
  }
}
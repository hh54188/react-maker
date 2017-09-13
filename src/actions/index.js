import * as actionTypes from 'actions/actionTypes';

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
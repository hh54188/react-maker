import { FILTER_TREE } from 'actions/actionTypes';
import { filterNodeBySearch, resetNode, filterNodeOfChecked } from '../util';

export default function appFolderStructure(state = {}, action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case FILTER_TREE:
      const { filterContent, showCheckedOnly, checkedKeys } = payload
      const filteredTreeBySearch = filterNodeBySearch(resetNode(state), filterContent);
      const filteredTreeOfChecked = filterNodeOfChecked(filteredTreeBySearch, checkedKeys);
      if (showCheckedOnly) {
        return filteredTreeOfChecked;
      } else {
        return filteredTreeBySearch;
      }
    default: return state;
  }
}
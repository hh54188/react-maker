import { FILTER_TREE } from 'actions/actionTypes';
import { filterNode } from '../util';

export default function appFolderStructure(state = {}, action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case FILTER_TREE:
      const result = filterNode({ ...state }, payload);
      console.log(payload, result);
      return result;
    default: return state;
  }
}
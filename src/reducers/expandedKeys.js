import { UPDATE_EXPANDED_KEYS } from 'actions/actionTypes';

export default function expandedKeys(state = [], action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case UPDATE_EXPANDED_KEYS: return payload;
    default: return state;
  }
}
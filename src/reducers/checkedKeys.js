import { UPDATE_CHECKED_KEYS } from 'actions/actionTypes';

export default function checkedKeys(state = [], action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case UPDATE_CHECKED_KEYS: return payload;
    default: return state;
  }
}
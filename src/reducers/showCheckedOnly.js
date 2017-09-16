import { TOGGLE_SHOW_CHECKED_ONLY } from 'actions/actionTypes';

export default function showCheckedOnly(state = {}, action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case TOGGLE_SHOW_CHECKED_ONLY: 
      return payload;
    default: return state;
  }
}
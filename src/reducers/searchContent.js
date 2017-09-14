import { CHANGE_SEARCH_CONTENT, CLEAR_SEARCH_CONTENT } from 'actions/actionTypes';

export default function searchContent(state = '', action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case CLEAR_SEARCH_CONTENT: return '';
    case CHANGE_SEARCH_CONTENT: return payload;
    default: return state;
  }
}
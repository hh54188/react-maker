import { combineReducers } from 'redux'
import expandedKeys from 'reducers/expandedKeys';
import checkedKeys from 'reducers/checkedKeys';
import appFolderStructure from 'reducers/appFolderStructure';
import searchContent from 'reducers/searchContent';
import showCheckedOnly from 'reducers/showCheckedOnly';

export default combineReducers({
  expandedKeys,
  checkedKeys,
  appFolderStructure,
  searchContent,
  showCheckedOnly,
});
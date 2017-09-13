import { combineReducers } from 'redux'
import expandedKeys from 'reducers/expandedKeys';
import checkedKeys from 'reducers/checkedKeys';
import appFolderStructure from 'reducers/appFolderStructure';
import options from 'reducers/options';
import searchContent from 'reducers/searchContent';

export default combineReducers({
  expandedKeys,
  checkedKeys,
  appFolderStructure,
  options,
  searchContent,
});
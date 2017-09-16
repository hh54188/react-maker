import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Main from './Main';

import * as actions from 'actions';

import 'antd/dist/antd.css';
import './App.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      appFolderStructure, expandedKeys, checkedKeys,
      onCheck, onExpand, 
      
      searchContent,
      onChangeSearchContent,

      onToggleShowCheckedOnly,
      showCheckedOnly
    } = this.props;
    return (
      <div>
      <Layout>
        <AppHeader />
        <Main
          appFolderStructure={appFolderStructure}
          expandedKeys={expandedKeys}
          checkedKeys={checkedKeys}

          onCheck={onCheck}
          onExpand={onExpand}
          
          showCheckedOnly={showCheckedOnly}
          onToggleShowCheckedOnly={onToggleShowCheckedOnly}

          searchContent={searchContent}
          onChangeSearchContent={onChangeSearchContent}
        />
        <AppFooter enableDownloadBtn={!!checkedKeys.length} />
      </Layout>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchContent: (searchContent, appFolderStructure, showCheckedOnly, checkedKeys) => {
      dispatch(actions.changeSearchContent(searchContent));
      dispatch(actions.filterTree(searchContent, showCheckedOnly, checkedKeys));
      dispatch(actions.reomputeExpandedKeys(searchContent, appFolderStructure));
    },
    onToggleShowCheckedOnly: (showCheckedOnly) => { dispatch(actions.showCheckedOnly(showCheckedOnly)) },
    onExpand: (expandedKeys) => { dispatch(actions.updateExpandedKeys(expandedKeys)) },
    onCheck: (checkedKeys) => { dispatch(actions.updateCheckedKeys(checkedKeys)) },
  };  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
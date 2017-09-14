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
      onFilterTree,
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

          searchContent={searchContent}
          onFilterTree={onFilterTree}
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
    onChangeSearchContent: (searchContent) => { dispatch(actions.changeSearchContent(searchContent)) },
    onExpand: (expandedKeys) => { dispatch(actions.updateExpandedKeys(expandedKeys)) },
    onCheck: (checkedKeys) => { dispatch(actions.updateCheckedKeys(checkedKeys)) },
    onFilterTree: (search) => { dispatch(actions.filterTree(search)) },
  };  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
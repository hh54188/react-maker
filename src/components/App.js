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
      onCheck, onExpand
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
        />
        <AppFooter />
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
    onExpand: (expandedKeys) => { dispatch(actions.updateExpandedKeys(expandedKeys)) },
    onCheck: (checkedKeys) => { dispatch(actions.updateCheckedKeys(checkedKeys)) },
  };  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
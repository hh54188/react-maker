import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Main from './Main';

import 'antd/dist/antd.css';
import './App.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { appFolderStructure } = this.props;
    return (
      <div>
      <Layout>
        <AppHeader />
        <Main appFolderStructure={appFolderStructure} />
        <AppFooter />
      </Layout>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps() {
  return {};  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
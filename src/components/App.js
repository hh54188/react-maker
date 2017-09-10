import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import AppHeader from './components/AppHeader.js';
import AppFooter from './components/AppFooter.js';
import Main from './components/Main.js';

import 'antd/dist/antd.css';
import './App.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <Layout>
        <AppHeader />
        <Main />
        <AppFooter />
      </Layout>
      </div>
    )
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
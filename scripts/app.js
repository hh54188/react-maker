import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import { Layout } from 'antd';

import AppHeader from './components/AppHeader.js';
import AppFooter from './components/AppFooter.js';
import Main from './components/Main.js';

import 'antd/dist/antd.css';
import './app.less';

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

export default App;
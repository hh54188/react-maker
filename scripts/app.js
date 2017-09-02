import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <Menu
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>        
      </div>
    )
  }
}

export default App;
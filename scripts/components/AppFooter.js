import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Footer } = Layout;
const { Item: MenuItem } = Menu;

import './AppFooter.less';

class AppFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Footer className="app-footer">
        <Menu
          mode="horizontal"
          theme="dark"
          style={{ lineHeight: '64px' }}
        >
          <MenuItem key="mail">
            <Icon type="mail" />Navigation One
          </MenuItem>
          <MenuItem key="app" disabled>
            <Icon type="appstore" />Navigation Two
          </MenuItem>
        </Menu>
      </Footer>
    )
  }
}

export default AppFooter
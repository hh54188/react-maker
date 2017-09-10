import React from 'react';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
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
        <Row>
          <Col span={12} offset={6}>
            <Menu
              mode="horizontal"
              theme="dark"
              style={{ lineHeight: '64px' }}
            >
              <MenuItem key="download">
                <Button type="primary" icon="download">下载</Button>
              </MenuItem>
            </Menu>
          </Col>
        </Row>
      </Footer>
    )
  }
}

export default AppFooter
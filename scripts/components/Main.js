import React from 'react';
import {
  Input,
  Tree,
  Menu,
  Icon,
  Layout,
  Row,
  Col,
  Switch,
  Form,
  Button,
} from 'antd';

const { TreeNode } = Tree;
const { Content } = Layout;
const { Item: FormItem } = Form;
const { Item: MenuItem } = Menu;

import SubMenu from './SubMenu.js';


import './Main.less';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const subMenuStyleObj = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    return (
      <Content className="app-main">
      <SubMenu />
      <Row>
        <Col span={12} offset={6}>
          <Tree
            checkable
            defaultExpandedKeys={['0-0-0']}
          >
            <TreeNode
              title={<div><Icon className="icon" type="folder" /><span>Parent</span></div>}
              key="0-0"
            >
              <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode
                  title={<div><Icon className="icon" type="file" /><span>Leaf</span></div>}
                  key="0-0-0-0" 
                />            
                <TreeNode title="leaf" key="0-0-0-1" />              
                <TreeNode title="leaf" key="0-0-0-2" />
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0" />
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0" />
                <TreeNode title="leaf" key="0-0-2-1" />
              </TreeNode>
            </TreeNode>
          </Tree>
        </Col>
      </Row>
      </Content>
    )
  }
}

export default Main;
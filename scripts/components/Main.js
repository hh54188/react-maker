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

class FolderItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Icon className="icon" type="folder" />
        <span>Folder</span>
      </div>
    );
  }
}

class FileItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Icon className="icon" type="file" />
        <span>File</span>
      </div>
    );
  }
}

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
          <Tree checkable>
            <TreeNode title={<FolderItem />} >
              <TreeNode title={<FolderItem />}>
                <TreeNode title={<FileItem />} />            
                <TreeNode title={<FileItem />} />            
                <TreeNode title={<FileItem />} />            
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
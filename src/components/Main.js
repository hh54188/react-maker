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
import FILE_TYPES from '../../common/file-types';

import './Main.less';

class NodeItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { type = FILE_TYPES.FILE, name, locked, selected } = this.props;
    return (
      <div className={'tree-item ' + (selected ? 'tree-item--selected' : '')}>
        <Icon className="icon" type={type} />
        {locked && <Icon className="icon" type="lock" />}
        <span>{name}</span>
      </div>
    );    
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  buildTreeNode(nodeInfo, parentKeys) {
    const { type = FILE_TYPES.FILE, name, children, locked } = nodeInfo;
    parentKeys.push(`${name}:${type}`);
    return (
      <TreeNode disableCheckbox={locked ? true : false} key={parentKeys.join('-')} title={<NodeItem {...nodeInfo} />} >
        {children && children.map((child) => {
          return this.buildTreeNode(child, parentKeys);
        })}
      </TreeNode>
    );
  }
  buildTree(appFolderStructure) {
    const { name, type, children } = appFolderStructure;
    const parentKeys = [`${name}:${type}`];
    return (
      <Tree
        checkable
        defaultExpandAll
        key={parentKeys.join('-')}
      >
      {appFolderStructure && this.buildTreeNode(appFolderStructure, parentKeys)}
      </Tree>
    )
  }
  render() {
    const { appFolderStructure } = this.props;
    const tree = this.buildTree(appFolderStructure);
    return (
      <Content className="app-main">
      <SubMenu />
      <Row>
        <Col span={12} offset={6}>
          {tree}
        </Col>
      </Row>
      </Content>
    )
  }
}

export default Main;
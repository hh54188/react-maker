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

import SubMenu from 'components/SubMenu.js';
import FILE_TYPES from 'common/file-types';

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
    this.onCheckHandler = this.onCheckHandler.bind(this);
    this.onExpandHandler = this.onExpandHandler.bind(this);
  }
  buildTreeNode(nodeInfo, parentKeys) {
    const { type = FILE_TYPES.FILE, name, children, locked } = nodeInfo;
    // 注意这里不要使用parentKeys.push的方式当作当前的key，并且传递给孩子元素，
    // 否则传递的是引用，会引起混乱 
    // 接下来的方法中生产key的原理都会遵循这个原则
    const currentKeys = [...parentKeys, `${name}:${type}`];
    return (
      <TreeNode disableCheckbox={locked ? true : false} key={currentKeys.join('-')} title={<NodeItem {...nodeInfo} />} >
        {children && children.map((child) => {
          return this.buildTreeNode(child, currentKeys);
        })}
      </TreeNode>
    );
  }
  onCheckHandler(checkedKeys, { checked }) {
    this.props.onCheck(checkedKeys);
  }
  onExpandHandler(expandedKeys, { expanded }) {
    this.props.onExpand(expandedKeys);
  }
  buildTree() {
    const { 
      appFolderStructure,
      expandedKeys,
      checkedKeys,
      onCheck,
      onExpand,
    } = this.props;
    return (
      <Tree
        checkable
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        onCheck={this.onCheckHandler}
        onExpand={this.onExpandHandler}
      >
      {appFolderStructure && this.buildTreeNode(appFolderStructure, [])}
      </Tree>
    )
  }
  render() {
    const tree = this.buildTree();
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
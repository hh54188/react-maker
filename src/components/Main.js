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
    const { appFolderStructure } = this.props;

    this.initialExpandedKeys = [];
    this.initialCheckedKeys = [];

    this.computeExpandedKeys.bind(this)(appFolderStructure);
    this.computeCheckedKeys.bind(this)(appFolderStructure);  
    
    // antd的Tree组件有一点坑爹的是，
    // 当你想标记某个节点是checked或者selected状态时，
    // 你没法通过在某个节点上标记checked属性来实现，
    // 只能在“树”的根节点汇总需要checked或者selected的节点的key来实现
    this.state = {
      expandedKeys: this.initialExpandedKeys,
      checkedKeys: this.initialCheckedKeys,
    };
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
  buildTree(appFolderStructure, expandedKeys, checkedKeys) {
    const onCheckHandler = (checkedKeys, { checked }) => {
      this.setState({
        checkedKeys,
      });
    };
    const onExpandHandler = (expandedKeys, { expanded }) => {
      this.setState({
        expandedKeys,
      });
    }
    return (
      <Tree
        checkable
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        onCheck={onCheckHandler}
        onExpand={onExpandHandler}
      >
      {appFolderStructure && this.buildTreeNode(appFolderStructure, [])}
      </Tree>
    )
  }
  /**
   * 找到需要选中的节点元素
   * @param {*} appFolderStructure 当前的目录结构
   * @param {*} parentKeys 祖先元素的keys
   */
  computeCheckedKeys(appFolderStructure, parentKeys = []) {
    const { name, type = FILE_TYPES.FILE, children, selected } = appFolderStructure;
    const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
    if (selected) {
      this.initialCheckedKeys.push(currentKeys.join('-'))
    }
    children && children.forEach((child) => {
      this.computeCheckedKeys(child, currentKeys);
    });
  }
  /**
   * 找到需要展开的节点
   * @param {*} appFolderStructure 当前的目录结构
   * @param {*} parentKeys 祖先元素的keys
   */
  computeExpandedKeys(appFolderStructure, parentKeys = []) {
    const { name, type = FILE_TYPES.FILE, children, expand } = appFolderStructure;
    const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
    if (expand) {
      this.initialExpandedKeys.push(currentKeys.join('-'))
    }
    children && children.forEach((child) => {
      this.computeExpandedKeys(child, currentKeys);
    });
  }
  render() {
    const { appFolderStructure } = this.props;
    const { expandedKeys, checkedKeys } = this.state;
    const tree = this.buildTree(appFolderStructure, expandedKeys, checkedKeys);
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
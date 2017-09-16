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
    const { type = FILE_TYPES.FILE, name, locked, checked } = this.props;
    const { searchContent } = this.props;
    const matchedSearchContent = searchContent && (name.indexOf(searchContent) > -1);

    let prefixText = '';
    let highlightText = '';
    let suffixText = '';

    if (matchedSearchContent) {
      const searchStartIndex = name.indexOf(searchContent);
      const searchEndIndex = searchStartIndex + searchContent.length;
      
      prefixText = name.substr(0, searchStartIndex);
      highlightText = searchContent;
      suffixText = name.substr(searchEndIndex);
    }

    return (
      <div className={'tree-item ' + (checked ? 'tree-item--checked' : '')}>
        <Icon className="icon" type={type} />
        {locked && <Icon className="icon" type="lock" />}
        {matchedSearchContent 
          ? <span>{prefixText}<em className="highlight">{highlightText}</em>{suffixText}</span>
          : <span>{name}</span>
        }
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
    const { type = FILE_TYPES.FILE, name, children, locked, invisible } = nodeInfo;
    const { searchContent } = this.props;
    
    if (invisible) {
      return null;
    }
    const currentKeys = [...parentKeys, `${name}:${type}`];
    return (
      <TreeNode disableCheckbox={locked ? true : false} key={currentKeys.join('-')} title={<NodeItem searchContent={searchContent} {...nodeInfo} />} >
        {children && children.map((child) => {
          return invisible ? null : this.buildTreeNode(child, currentKeys);
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
        checkStrictly
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
    console.log('-----Render ExpandedKeys------');
    console.log(this.props.expandedKeys);    
    console.log('-----Render CheckedKeys------');
    console.log(this.props.checkedKeys);    
    
    const {
      searchContent,
      onChangeSearchContent,
      appFolderStructure,
      checkedKeys,
      onToggleShowCheckedOnly,
      showCheckedOnly
    } = this.props;
    return (
      <Content className="app-main">
      <SubMenu
        appFolderStructure={appFolderStructure}
        searchContent={searchContent}
        checkedKeys={checkedKeys}
        showCheckedOnly={showCheckedOnly}
        onToggleShowCheckedOnly={onToggleShowCheckedOnly}
        onChangeSearchContent={onChangeSearchContent}
      />
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
import React from 'react';
import './SubMenu.less';

import { Switch, Input, Icon, Button, Form, Select, Radio } from 'antd';
const { Item: FormItem } = Form;
const { Option } = Select;


class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    }
    this.onToggleShowOptions = this.onToggleShowOptions.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.onSwitchChangeHandler = this.onSwitchChangeHandler.bind(this);
  }
  onToggleShowOptions() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  onSearchChangeHandler(event) {
    const {
      appFolderStructure,
      onChangeSearchContent,
      showCheckedOnly,
      checkedKeys,
    } = this.props;
    const content = event.target.value;
    onChangeSearchContent(content, appFolderStructure, showCheckedOnly, checkedKeys);
  }
  onSwitchChangeHandler(checked) {
    const { onToggleShowCheckedOnly } = this.props;
    onToggleShowCheckedOnly(checked);

    const {
      searchContent,
      appFolderStructure,
      onChangeSearchContent,
      showCheckedOnly,
      checkedKeys,
    } = this.props;
    onChangeSearchContent(searchContent, appFolderStructure, checked, checkedKeys);    
  }
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 7
      }
    }  
    const formButtonLayout = {
      labelCol: {
        span: 0
      },      
      wrapperCol: {
        span: 7,
        offset: 5 
      }      
    }
    const { collapse } = this.state;
    const { searchContent, showCheckedOnly } = this.props;
    return (
      <div className="sub-menu">    
        <Form style={{ width: '960px' }}>
          <FormItem { ...formItemLayout } label="搜索目录或者文件名称">
            <Input value={searchContent} onChange={this.onSearchChangeHandler} />          
          </FormItem>
          { 
            !collapse && 
            <div className="collapse-group">
              <FormItem { ...formItemLayout } label="只选择已选项">
                <Switch onChange={this.onSwitchChangeHandler} checked={showCheckedOnly} />       
              </FormItem>
            </div>
          }
          <FormItem { ...formButtonLayout }>
            {!collapse && <Button className="btn" type="primary" size="default">重置</Button>}
            {collapse && <Button onClick={this.onToggleShowOptions} icon="down-circle-o" className="btn" size="default">显示更多选项</Button>}
            {!collapse && <Button onClick={this.onToggleShowOptions} icon="up-circle-o" className="btn" size="default">收起更多选项</Button>}
          </FormItem>         
        </Form>
      </div>
    );
  }
}

export default SubMenu;
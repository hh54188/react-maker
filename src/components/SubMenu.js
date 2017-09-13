import React from 'react';
import './SubMenu.less';

import { Switch, Input, Icon, Button, Form, Select, Radio } from 'antd';
const { Item: FormItem } = Form;
const { Search } = Input;
const { Option } = Select;


class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    }
    this.onToggleShowOptions = this.onToggleShowOptions.bind(this);
  }
  onToggleShowOptions() {
    this.setState({
      collapse: !this.state.collapse
    });
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
    return (
      <div className="sub-menu">    
        <Form style={{ width: '960px' }}>
          <FormItem { ...formItemLayout } label="搜索目录或者文件名称">
            <Input />          
          </FormItem>
          { 
            !collapse && 
            <div className="collapse-group">
              <FormItem { ...formItemLayout } label="只选择已选项">
                <Switch checked={false} />       
              </FormItem>
              <FormItem { ...formItemLayout } label="显示解释">
                <Switch checked={true} />       
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
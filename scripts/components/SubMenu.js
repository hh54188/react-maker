import React from 'react';
import './SubMenu.less';

import { Switch, Input, Icon, Button, Form, Select, Radio } from 'antd';
const { Item: FormItem } = Form;
const { Search } = Input;
const { Option } = Select;


class SubMenu extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="sub-menu">
        <Form style={{ width: '50%' }}>
          <FormItem { ...formItemLayout } label="搜索目录或者文件名称">
            <Input />          
          </FormItem>
          <FormItem
            label="项目类型"
            {...formItemLayout}
          >
            <Radio.Group defaultValue="horizontal" >
              <Radio.Button value="horizontal">自定义</Radio.Button>
              <Radio.Button value="vertical">最小</Radio.Button>
              <Radio.Button value="inline">redux</Radio.Button>
              <Radio.Button value="inline">所有</Radio.Button>
            </Radio.Group>
          </FormItem>            
          <FormItem { ...formItemLayout } label="显示解释">
            <Switch defaultChecked={true} />       
          </FormItem>
          <FormItem { ...formItemLayout } label="项目类型">
            <Select defaultValue="lucy" style={{ width: 120 }} >
              <Option value="jack">自定义</Option>
              <Option value="lucy">最小</Option>
              <Option value="Yiminghe">redux</Option>
            </Select>
          </FormItem>
          <FormItem { ...formButtonLayout } label=" " >
            <Button className="btn" type="primary" size="sm">重置</Button>
            <Button icon="up" className="btn" size="sm">收起</Button>
          </FormItem>          
        </Form>
      </div>
    );
  }
}

export default SubMenu;
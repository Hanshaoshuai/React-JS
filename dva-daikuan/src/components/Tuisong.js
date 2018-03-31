import React,{Component} from "react";
import { Select,InputNumber,Button,Input,Icon  } from 'antd';
import 'antd/lib/select/style/css';
import 'antd/lib/input-number/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
const Option = Select.Option;
const provinceData = ['每日', '每周','每月'];
const cityData = {
  每日: [],
  每周: ['星期一', '星期二', '星期三','星期四','星期五','星期六','星期天'],
  每月: ['01', '02', '03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
};

class Tuisong extends React.Component {
state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }
  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }
  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }
  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <div style={{ marginTop:20,background:'#f7f7f7',height:100 }}>
          <h2 style={{ color:'#73879c',height:40,borderBottom:'2px solid #ccc',paddingTop:10,paddingLeft:20}}>定时推送规则设置</h2>
          <div style={{ marginTop:15,paddingLeft:20}}>
        <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>&nbsp;
        <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>&nbsp;
          <InputNumber min={0} max={24} defaultValue={14}/>&nbsp;
          <InputNumber min={0} max={60} defaultValue={50}/>&nbsp;
          <Button type="primary">删除</Button>
          </div>
        </div>
        <div style={{ marginTop:20,background:'#f7f7f7',height:100}}>
          <h2 style={{ color:'#73879c',height:40,borderBottom:'2px solid #ccc',paddingTop:10,paddingLeft:20}}>还款到期推送规则设置</h2>
          <div style={{ marginTop:15,paddingLeft:20}}>
          <Select defaultValue="还款计划到期后" style={{ width: 120 }}>
            <Option value="还款计划到期前">还款计划到期前</Option>
            <Option value="还款计划到期后">还款计划到期后</Option>
          </Select>&nbsp;
          <InputNumber min={0} max={100} defaultValue={1}/>&nbsp;
          <Select defaultValue="小时" style={{ width: 120 }}>
            <Option value="小时">小时</Option>
            <Option value="天">天</Option>
          </Select>&nbsp;
          <Button type="primary">删除</Button>
          </div>
        </div>
        <div style={{ marginTop:20,background:'#f7f7f7',height:100}}>
          <h2 style={{ color:'#73879c',height:40,borderBottom:'2px solid #ccc',paddingTop:10,paddingLeft:20}}>借款总览定时推送接收人设置</h2>
          <div style={{ marginTop:15,paddingLeft:20}}>
              <Input
                placeholder="用户名称"
                prefix={<Icon type="user" />}
                ref={node => this.userNameInput = node}
                style={{ width:200 }}
              />&nbsp;
               <Button type="primary">添加</Button>
          </div>
          <div style={{ marginTop:20,background:'#f7f7f7',height:50,padding:'10px 20px' }}>
               <Button type="primary" style={{width:300}}>提交</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Tuisong;

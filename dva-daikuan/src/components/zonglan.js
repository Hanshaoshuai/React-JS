import React,{Component} from "react";
import { DatePicker,Button } from 'antd';
import 'antd/lib/date-picker/style/css';
const { MonthPicker, RangePicker } = DatePicker;
class Zonglan extends React.Component {
  render(){
    return(
         <div>
         <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>借款总览</div>
          <RangePicker />&nbsp;
           <Button type="primary">搜索</Button>
           <ul style={{marginTop:20}}>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>合同数量</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>合同金额</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>提款金额</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>应收本金</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>已收本金</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>应收利息</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>已收利息</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>应收罚金</span><span style={{marginLeft:30}}>1</span></p>
              <p style={{fontSize:16,color:'#73879c',marginTop:20}}><span>已收罚金</span><span style={{marginLeft:30}}>1</span></p>
           </ul>
        </div>
      )
  }
}
export default Zonglan;

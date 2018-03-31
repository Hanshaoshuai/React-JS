import React,{Component} from "react";
import { Steps, Button, message } from 'antd';
import 'antd/lib/steps/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/message/style/css';
const Step = Steps.Step;
const steps = [{
  title: '用户基本信息',
  content: '111',
  admin:'李文祥',
}, {
  title: '用户对应岗位',
  content: 'Second-content',
}];
class Bianji extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div style={{width:'100%',height:200,background:'#f7f7f7',marginTop:30,textAlign:'center'}}>用户姓名：<input type="text" value={steps[this.state.current].content} style={{marginTop:40}}/><br/>用户账号：<input type="text" value={steps[this.state.current].admin} style={{marginTop:40}}/></div>
        <div className="steps-action" >
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()} style={{marginTop:20}}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" style={{marginTop:20}} onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 ,width:100 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 ,width:100 }} onClick={() => this.prev()}>
              Finsh
            </Button>
          }
        </div>
      </div>
    );
  }
}
export default Bianji;

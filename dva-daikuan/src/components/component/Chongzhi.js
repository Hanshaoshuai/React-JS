import React,{Component} from "react";
import { Button } from 'antd';
import 'antd/lib/button/style/css';
import {Link} from 'dva/router';
class Chongzhi extends React.Component {
    render(){
      return(
          <div style={{position:'fixed',width:300,height:200,background:'#fff',left:0,top:0,right:0,bottom:0,margin:'200px auto',zIndex:'2',border:'1px solid #ccc'}}>
              <div style={{width:'100%',borderBottom:'2px solid #f7f7f7',height:40,color:'#73879c',fontSize:20,padding:'8px 15px'}}>重置用户密码<Link to='userall' style={{marginLeft:130,color:'red'}}>X</Link></div>
              <div style={{marginLeft:50,fontSize:14}}>重置密码：<input type='password' style={{width:120,height:30,marginTop:20,paddingLeft:10}}/></div>
              <div style={{marginLeft:50,fontSize:14,marginTop:20}}>密码确认：<input type='password' style={{width:120,height:30,paddingLeft:10}}/></div>
              <div stlye={{width:'100%',height:50,marginTop:20}}>
                <Button type="primary" style={{width:60,margin:'20px 0 0 150px'}}><Link to='userall' style={{display:'block',width:'100%'}}>取消</Link></Button>
                <Button type="primary" style={{width:60,marginLeft:10}}>重置</Button>
              </div>
        </div>
        )
    }
}
export default Chongzhi;

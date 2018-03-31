import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    axios.get("https://randomuser.me/api").then(function(res){
      console.log(res)
    }).catch(function(err){
      console.log(err)
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        if(values.userName=="111"&&values.password=="111"){
            window.sessionStorage.setItem('username',values.userName)
            window.location="#/example";
        }else{
          alert("账号或密码错误")
        }
        
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width:350,height:400,position:'fixed',left:0,right:0,top:0,bottom:0,margin:'100px auto'}}>
      <div className={styles.denglulogo}><span className={styles.spa1}></span><span className={styles.spa2}>欢迎登陆</span><span className={styles.spa3}></span></div>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的账号!' }],
          })(
            <Input placeholder="Username" style={{marginTop:20}}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input type="password" placeholder="Password" style={{marginTop:20}}/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%',height:30,marginTop:20}}>
            登陆
          </Button>
          <div className={styles.banquan}>©2017 版权归云南青才信息科技有限公司所有</div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;


import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Zizujian from './dengluzizujian.js';

export default class DengLu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phone:/^1[34578]\d{9}$/,
      texts:"请输入手机号",
      posswordText:"请输入密码",
      phoneNone:'none',
      posswordNone:'none',
     	phoneNumber:"",
     	passwords:"",
     	block:"none",
     	list: [],
     	zizujian:'woshi子组件',
     	xiajicangshu:'',
     	ziJingtaishuju:''
    }
//  this.dengLu=this.dengLu.bind(this) //绑定this
  }
  
  phoneNB(){
		this.setState({
			phoneNone:"none",
			texts:"输入手机号有误"
		})
  }
  phoneBlur(){
  	if(!this.refs.phoneNumber.value){
  		this.setState({
  			phoneNone:"block"
  		})
  		return;
  	}
  	if(!this.refs.phoneNumber.value.match(this.state.phone)) {
			this.setState({
				phoneNone:"block",
  			texts:"输入手机号有误"
  		})
  	}
  }
  passWords(){
  	this.setState({
			posswordNone:"none",
			posswordText:"请输入手机号",
		})
  }
  passWordBlur(){
  	if(this.refs.passwords.value.length<6){
  		this.setState({
  			posswordNone:"block",
  			posswordText:"请输入不少于6位密码",
  		})
  	}
  }
  dengLu(){
  	if(this.state.phoneNone=='block' || this.state.posswordNone=='block'){
  		return;
  	}
  	if(!this.refs.phoneNumber.value){
  		this.setState({
  			phoneNone:"block"
  		})
  		return;
  	}
  	if(!this.refs.passwords.value){
  		this.setState({
  			posswordNone:"block"
  		})
  		return;
  	}
  	this.setState({
			block:"block"
		})
//	$.ajax({
//			url:'http://test.qironghome.com/index.php/login/go',
//			type:'post',
//			dataType:'json',
//			data:{phone:this.refs.phoneNumber.value,pwd:this.refs.passwords.value,type:'reg',_scfs:'ede2ec51871f533b48db4a9acdd24395'}
//		}).done(function(data){
//			console.log(data)
//			if(data.status == 1) {
				window.location.href='#/WoyaoRongzi';
//			} else {
//				var i=0;
//				$.each(data.msg,function(putid,putv){
//					i++;
//					if(i==1){ alert(putv); }
//				});
//			}
//		})
  }
  componentWillMount(){
  	console.log("componentWillMount")
  	setTimeout(()=>{
	  	this.setState({
	  		ziJingtaishuju:Zizujian.jingtai()
	  	})
  	},3000)
//	Zizujian.jingtai();  //调用子组件的静态函数；
  }
  componentDidMount(){
  	console.log("componentDidMount")
  }
  handleBtnClick() {
		this.state.list.push(this.refs.input.value);
		this.setState({
			list: this.state.list
		})
	}
	laizizizujian(result){  //接收子组件的传值
		this.setState({
			xiajicangshu:result
		})
//		alert(result)
  }
  render() {
    return (
    	<div id="Denglu">
		  	<div className="home">
					<img src="./img/qr-14.png"/>
					<div className="box">
						<div className="opasity">
							<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				  			<div style={{display:this.state.block}} className="hao"><span>放假快乐大家</span></div>
				  			<input type="text" ref="input"/>
								<button onClick={this.handleBtnClick.bind(this)}>新增事项</button>
								<ul>
									<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
										{
											this.state.list.map((value, index) => {
												return <li key={index + '_todolist'}>{value}</li>
											})
										}
									</ReactCSSTransitionGroup>
								</ul>
				  		</ReactCSSTransitionGroup>
						</div>
						<div className="content">
							<ul>
								<li className="logo">
									<img className="logo-left" src="./img/28.png"/>
									<img className="logo-right" src="./img/qr-4.png"/>
								</li>
								<li className="text">
									<div className="phone">
										<img src='./img/qr-5.png'/>
										<input placeholder="请输入手机号" onBlur={this.phoneBlur.bind(this)} onChange={this.phoneNB.bind(this)} ref="phoneNumber" name="phone" id="telphone_1" className="txt-input" type="text"/>
										<span style={{display:this.state.phoneNone}} className="shouji">{this.state.texts}</span>
									</div>
									<div className="password phone">
										<img src='./img/qr-6.png'/>
										<input  placeholder="请输入密码" onBlur={this.passWordBlur.bind(this)} onChange={this.passWords.bind(this)} ref="passwords" type="password" id="pwd_1" className="txt-input txt-password" name="password"/>
										<span style={{display:this.state.posswordNone}} className="mima">{this.state.posswordText}</span>
									</div>
									<div onClick={this.dengLu.bind(this)} className="item-btns">
										<span>登录</span>
										<Zizujian zizujian={this.state.zizujian} todoFn={this.laizizizujian.bind(this)}></Zizujian>
										<div style={{color:'#000000',fontSize:"30px"}}>{this.state.xiajicangshu}</div>
										<div style={{color:'#000000',fontSize:"36px"}}>{this.state.ziJingtaishuju}</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
    )
  }
}


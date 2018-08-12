import React from 'react';
import {connect} from 'react-redux';
import { Carousel, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import "./index.less";


import times from 'gettimesjs';
var getuppercase= require('getuppercase');



// UI组件
// 不负责具体业务，所有的参数和方法，都通过props获得
class ContentComponent extends React.Component {
	constructor (props) {
	    super(props)
	    this.state = {
	    	data: ['1', '2', '3'],
    		imgHeight: 176,
	    }
	//  this.dengLu=this.dengLu.bind(this) //绑定this
	}
	componentDidMount(){
		
		$.ajax({
		  url:'/api/articles.json',
		  type: 'GET',
		  dataType: 'json',
		  data: {},
		  success: function(res){
		    console.log(res)
		  }
		}) 
		
		console.log(new Date().getTime())
		let dom = document.getElementById('box');
		let dom1 = document.getElementById('box1');
		let dom2 = document.getElementById('box2');
		let dom3 = document.getElementById('box3');
		let dom4 = document.getElementById('box4');
		let dom5 = document.getElementById('box5');
		dom1.innerText="过去式记录格式为：刚刚、多少分钟前、多少小时前："+times.numToTime(1528300940833);
		dom2.innerText="过去式记录格式为：几时几分、超过24小时显示几月几日："+times.numToTime1(1528180940833);
		dom3.innerText="倒计时格式一次性提示还剩下："+times.numToTime2(1552992599122);
		setInterval(function(){
			dom.innerText="参数为字符串间隔符号可自定义，返回为详细时间格式："+times.formatDate("yyyy-MM-dd EE AM hh:mm:ss S q");
			dom4.innerText="倒计时格式实时刷新性提示："+times.numToTime3(1552992599122);
		},10);
		dom5.innerText=getuppercase.digitUppercase(686868.68);
		setTimeout(() => {
	      	this.setState({
	        	data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
	      	});
	    }, 100);
	}
	shiyian(){
		alert("jjj")
	}
	dianJi() {
		var values=this.refs.values.value
		if(values==''){
			alert('请输入内容')
			return;
		}
//		console.log(this.props.zidingyi)
		var news=this.props.zidingyi;
//		console.log(news)
		var zuiXin=news.concat(values) 
		setTimeout(()=>{
			this.props.handleGetDataSucc(zuiXin);
		},10)
		
	}
	jian(index){
		var news=this.props.zidingyi;
		var arrays=[];
		for(var i=0;i<news.length;i++){
			if(i!==index){
				arrays.push(news[i]);
			}
		}
		this.props.handleGetDataSucc(arrays);
	}
	render() {
		return (
			<div className="index-content">
		        <Carousel
		          autoplay={true}
		          infinite
		          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
		          afterChange={index => console.log('slide to', index)}
		        >
		          {this.state.data.map(val => (
		            <a
		              key={val}
		              href="http://www.alipay.com"
		              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
		            >
		              <img
		                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
		                alt=""
		                style={{ width: '100%', verticalAlign: 'top' }}
		                onLoad={() => {
		                  // fire window resize event to change height
		                  window.dispatchEvent(new Event('resize'));
		                  this.setState({ imgHeight: 'auto' });
		                }}
		              />
		            </a>
		          ))}
		        </Carousel>
		        <Carousel className="my-carousel"
			      vertical
			      dots={false}
			      dragging={false}
			      swiping={false}
			      autoplay
			      infinite
			      speed={200}
			      autoplayInterval={300}
			      resetAutoplay={false}
			    >
			      {['ring', 'ruby', 'iPhone', 'iPod', 'sorry', 'tourism', 'coke', 'ticket', 'note'].map(type => (
			        <div className="v-item" key={type}>{type}</div>
			      ))}
			    </Carousel>
				<input ref="values"/>
				<button  onClick={this.dianJi.bind(this)}>添加</button>
				<div>
					{
						this.props.zidingyi.map((value, index) => {
							return (
								<div key={index}>
									<p className="article-item" >
										{value}
										<button ref="jian" style={{marginLeft:'10px'}} id={index} onClick={this.jian.bind(this,index)}>
											减少
										</button>
									</p>
								</div>
							)
						})
					}
				</div>
				<div id="box"></div>
				<div id="box1"></div>
				<div id="box2"></div>
				<div id="box3"></div>
				<div id="box4"></div>
				<div id="box5"></div>
				<Button type="primary">primary</Button>
    			<Button type="primary" disabled>primary disabled</Button>
    			<div id="img"></div>
    			<img src="./img/qr-12.png"/>
			</div>
		)
	}

}







// React-redux 的connect 方法，会把UI组件，自动转化为一个容器组件，容器组件，有点类似以前我们的controller组件

function mapStateToProps(store) {  // state对应的就是全局的store
	console.log(store);
	return { 
		zidingyi: store.zidingyi
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleGetDataSucc: function(news) {
			var action = {
				type: "FETCH_CONTENT",
				zidingyi: news
			}
			dispatch(action);
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Carousel, WingBlank, Button, WhiteSpace } from 'antd-mobile';
//import MainLayout from '../components/MainLayout/MainLayout';

import times from 'gettimesjs';
//var getuppercase= require('getuppercase');

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
//		dom5.innerText=getuppercase.digitUppercase(686868.68);
		setTimeout(() => {
	      	this.setState({
	        	data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
	      	});
	    }, 100);
	}
	render() {
		return (
			<div className="index-content">
		        
				<div id="box"></div>
				<div id="box1"></div>
				<div id="box2"></div>
				<div id="box3"></div>
				<div id="box4"></div>
				<div id="box5"></div>
				<div className={styles.box}></div>
			</div>
		)
	}

}

function IndexPage({ location,name }) {
  return (
      <div className={styles.normal}>
      	<ContentComponent/>
        <h1 className={styles.title}>这是怎么回事!</h1>
        <h1 className={styles.title}>哦我知道了</h1>
        {name}
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
        <Button type="primary">primary</Button>
    		<Button type="primary" disabled>primary disabled</Button>
      </div>
  );
}

function mapStateToProps(state) {
  const { name } = state.users;
  return {
    name,
  }
}

IndexPage.propTypes = {
};

export default connect(mapStateToProps)(IndexPage);
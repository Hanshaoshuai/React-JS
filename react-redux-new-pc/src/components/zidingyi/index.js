import React from 'react';

import moment from 'moment';
import { DatePicker, Table, Modal, Button, Transfer   } from 'antd';

import {connect} from 'react-redux';
import "./index.css";

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';


import times from 'gettimesjs';
var getuppercase= require('getuppercase');



let dates={
	'mockData': [
		{
	        key: '0',
	        title: 'content1',
	        description: 'description of content1',
	        chosen: true,
	   	},{
	        key: '1',
	        title: 'content2',
	        description: 'description of content2',
	        chosen: false,
	    },{
	        key: '2',
	        title: 'content3',
	        description: 'description of content3',
	        chosen: true,
	    }
	],
	'targetKeys': []
}
let id = 0;
let index = 0;

// UI组件
// 不负责具体业务，所有的参数和方法，都通过props获得
class ContentComponent extends React.Component {
	constructor (props) {
	    super(props)
	    this.state = {
	     	columns : [
			  { title: '出资机构', dataIndex: 'name', key: 'name' },
			  { 
			  	title: '操作', dataIndex: '', key: 'x', width:'20%',
			  	render: (record) => <a onClick={this.showModal.bind(this,record.key)} style={{ fontSize: '14px' }} href="javascript:;">编辑</a> 
			  },
			],
	     	data : [
			  { key: 1, name: 'John Brown', description: ['My Brown', 'is John Brown','My name Brown'], chosen: true, targetKeys: [] },
			  { key: 2, name: 'Jim Green', description: ['My Green', 'is Jim Green', 'My name Green'], chosen: false, targetKeys: [] },
			  { key: 3, name: 'Joe Black', description: ['My Black', 'is Joe Black', 'My name Black'], chosen: true, targetKeys: [] },
			],
			targetKeys: [],
	    	visible: false,
	    	confirmLoading: false,
	    	id: 0
	    }
	//  this.dengLu=this.dengLu.bind(this) //绑定this
	}
	componentDidMount(){
		console.log(new Date().getTime())
		var dom = document.getElementById('box');
		var dom1 = document.getElementById('box1');
		var dom2 = document.getElementById('box2');
		var dom3 = document.getElementById('box3');
		var dom4 = document.getElementById('box4');
		var dom5 = document.getElementById('box5');
		
		
		dom1.innerText="过去式记录格式为：刚刚、多少分钟前、多少小时前："+times.numToTime(1528300940833);
		dom2.innerText="过去式记录格式为：几时几分、超过24小时显示几月几日："+times.numToTime1(1528180940833);
		dom3.innerText="倒计时格式一次性提示还剩下："+times.numToTime2(1552992599122);
		setInterval(function(){
			dom.innerText="参数为字符串间隔符号可自定义，返回为详细时间格式："+times.formatDate("yyyy-MM-dd EE AM hh:mm:ss S q");
			dom4.innerText="倒计时格式实时刷新性提示："+times.numToTime3(1552992599122);
		},10);
		dom5.innerText=getuppercase.digitUppercase(686868.68);
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
	showModal(toid){
		id = toid-1
	    this.setState({
	      	visible: true,
	      	id:toid-1
	    });
	    if(index!=0){
	    	console.log(id)
	    	this.refs.chilDate.getMock();
	    }
	    index += 1;
	}
	handleOk(){
		console.log(this.refs.chilDate.state)
	    this.setState({
	      confirmLoading: true,
	    });
	    setTimeout(() => {
	      this.setState({
	        visible: false,
	        confirmLoading: false,
	      });
	    }, 2000);
	}
	handleCancel(){
	    console.log('Clicked cancel button');
	    this.setState({
	      visible: false,
	    });
	}	
//	<Button type="primary" onClick={this.showModal.bind(this)}>Open</Button>
	render() {
		const { visible, confirmLoading, ModalText } = this.state;
		let style1 = { lineHeight:'40px', borderBottom: '1px solid #d9d9d9' }
		let style2 = { lineHeight:'40px' }
		return (
			<div className="index-content">
				
				<div>
			        <Modal title="Title"
			        	width='800'
			          	visible={visible}
			          	onOk={this.handleOk.bind(this)}
			          	confirmLoading={confirmLoading}
			          	onCancel={this.handleCancel.bind(this)}
			        >
			          	<p style={{textAlign: '',paddingLeft: '60px'}}>
			          		<App ref='chilDate' dates={this.state} style={{display:'inline-block'}}/>
			          	</p>
			        </Modal>
			    </div>
				
				
				<Table
					style={{ fontSize: '14px' }}
				    columns={this.state.columns}
				    expandedRowRender={
				    	(record) => {
				    		let records = []
				    		for(let i=0; i<record.description.length; i++){
						    	records.push(
						    		<div style={ i<(record.description.length-1) ? style1 : style2}>
						    			{record.description[i]}
						    		</div>
						    	)
				    		}
				    		return records
					    }
				    }
				    dataSource={this.state.data}
				/>
			
			
				<div>
				    <DatePicker defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} />
				    <br />
				    <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
				    <br />
				    <RangePicker
				      defaultValue={[moment('2015-01-01', dateFormat), moment('2015-01-01', dateFormat)]}
				      format={dateFormat}
				    />
				</div>
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
			</div>
		)
	}

}


class App extends React.Component {
	constructor (props) {
	    super(props)
		this.state = {
		    mockData: [],
		    targetKeys: [],
		}
	}
  	componentDidMount() {
    	this.getMock();
  	}
  	getMock () {
  		const dates = this.props.dates.data[id];
	    const targetKeys = dates.targetKeys;
	    const mockData = [];
	    for (let i = 0; i < dates.description.length; i++) {
	    	const data = {
		        key: i.toString(),
		        description: dates.description[i],
//		        chosen: Math.random() * 2 > 1,
		    };
////	    	for(let x=0; x<mockData[i].description.length; x++){
//	    		if (mockData[i].chosen) {
//			        targetKeys.push(mockData[i].key);
//			    }
////	    	}
	    	mockData.push(data)
	    }
	    this.setState({ mockData:mockData, targetKeys:targetKeys });
	}
  	handleChange (targetKeys, direction, moveKeys) {
	    console.log(targetKeys, direction, moveKeys);
	    this.setState({ targetKeys });
	}
  	renderItem (item) {
	    const customLabel = (
	      <span className="custom-item">
	        {item.title} - {item.description}
	      </span>
	    );
	
	    return {
	      label: customLabel, // for displayed item
	      value: item.title, // for title and filter matching
	    };
	}
  	render() {
	    return (
	      <Transfer
	      listStyle={{right: '0', left:'0'}}
	        dataSource={this.state.mockData}
	        listStyle={{
	          width: 300,
	          height: 300,
	        }}
	        targetKeys={this.state.targetKeys}
	        onChange={this.handleChange.bind(this)}
	        render={this.renderItem.bind(this)}
	      />
	    );
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
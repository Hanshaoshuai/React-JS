import React from 'react'

import { Link , browserHistory} from 'react-router'

import Scroller from '../../component_dev/scroller/src/'

import ReactDOM from 'react-dom'

import Kindlist from './kind-list'

import Kindsousuo from './kind-sousuo'

import $ from 'jquery'

class Kind extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      swiperList: [<div/>],
      swiperList1:"",
      datalist:"",
      classID:"",
      goodsID:"",
      isLogin:"none",
      sousuo:"",
      sousuoshow:""
    }
    this.tolist=this.tolist.bind(this)
    this.todolist=this.todolist.bind(this)
    this.show=this.show.bind(this)
  }
	componentWillMount(){
		this.setState({
			isLogin:"none"
		})
		var that=this;
		let url = "http://datainfo.duapp.com/shopdata/getclass.php"
    	fetch(url).then(response=>response.json())
      	.then(res=>{
	    	//console.log(res)
	        let Lis = res.map(val=>{
	          return (<li><span data-classId={val.classID} onClick={that.tolist}>{val.className}</span></li>)
	        })
	        this.setState({
	          swiperList: Lis
	        })
      	})
		
		
		var reqUrl = "http://datainfo.duapp.com/shopdata/getGoods.php";
		$.ajax({
			type:"get",
			url:reqUrl+"?callback=",
			data:{classID:"1"},
			dataType:"JSONP",
			beforeSend:function(){},
			success:function(data){
				//console.log("11111",data)
				var loti="/kindlistchild/"+data[0].classID;
				let Lis1 = data.map(val=>{
					return (<li><Link to={loti}>{val.goodsName}</Link></li>)
		        })
		        that.setState({
		          swiperList1: Lis1
		        })
			}
		})
		
		
		
	
	}
	
	
	
	
	fanhui(){
		browserHistory.goBack()
	}
	show(){
		
		if(this.state.isLogin=="none"){
			this.setState({
				isLogin:"block"
			})
		}else{
			this.setState({
				isLogin:"none"
			})
		}
	}
  render() {
    return (
      <div className="m-kind">
        <header>
          <div className="yo-header-ab">
          	<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
            <h2 className="title">
	            <span className="sousuo">
	            	<font className="link_1"><Link to="/kindsousuo">搜索商品名称或商品编号</Link></font>
	            	<font className="img1">
	            		<Link to="/kindsousuo"><img src="./iconfont/3_03.png"/></Link>
	            	</font>
            	</span>
            </h2>
            <span className="img2" onClick={this.show}><img src="iconfont/03.png"/></span>
          </div>
        </header>
        <div className="nav-s" style={{display:this.state.isLogin}}>
        	<ul>
	            <li className="active">
	              <Link to="/home"  activeClassName="active">
	                <i className="yo-ico">&#xe83d;</i>
	                <b>首页</b>
	              </Link>
	            </li>
	            <li>
	              <Link to="/kind" activeClassName="active">
	                <i className="yo-ico">&#xe601;</i>
	                <b>分类</b>
	              </Link>
	            </li>
	            <li>
	            <Link to="/cart" activeClassName="active">
	              <i className="yo-ico">&#xe616;</i>
	              <b>购物车</b>
	            </Link>
	            </li>
	            <li>
	            <Link to="/user" activeClassName="active">
	              <i className="yo-ico">&#xe6b7;</i>
	              <b>我的</b>
	            </Link>
	            </li>
          	</ul>
        </div>
        <div className="kind-list" style={{display:this.state.sousuoshow}}>
        	<div className="list-zuo">
        	
        		<ul>
					{this.state.swiperList}
				</ul>
						
        	</div>
        	<div className="list-you">
        		<ul>
        			<Link className={this.state.goodsID} >{this.state.swiperList1}</Link>
        		</ul>
        	</div>
        </div>
        {this.state.sousuo}
        
      </div>
    )
  }
  	
	componentDidMount() {
		
	}
		todolist(e){
			console.log(e.target.data)
			/*this.setState({
				goodsID:e.target.className
			})*/
			
		}
		tolist(e){
			var that=this;
			//console.log(e.target.getAttribute("data-classId"))		
			var classID = e.target.getAttribute("data-classId");
			var reqUrl = "http://datainfo.duapp.com/shopdata/getGoods.php";
			$.ajax({
				type:"get",
				url:reqUrl+"?callback=",
				data:{classID:classID},
				dataType:"JSONP",
				beforeSend:function(){
					
				},
				success:function(data){
					console.log(data)
					if(data == 0){
						that.setState({
				          swiperList1: <li><span>暂无产品</span></li>
				       })
					}else{
						var loti="/kindlistchild/"+data[0].classID;
						console.log(loti)
						let Lis1 = data.map(val=>{
				          return (<li><Link to={loti}>{val.goodsName}</Link></li>)
				        })
				        that.setState({
				          swiperList1: Lis1,
				          classID:classID
				        })
						
					}
				}
			})
		}
		
	
	
}

export default Kind









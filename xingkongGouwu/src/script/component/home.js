import React from 'react'
import Carousel from '../../component_dev/carousel/src/'
import Scroller from '../../component_dev/scroller/src/'
import {Link} from 'react-router'
import fetchData from '../util/util.fetch.js'
import List from '../../component_dev/list/src/'


class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			swiperList: [<div/>],
			linkto:<div/>,
			floorlive:<div/>,
			hotproduct:<div/>,
			life:<div/>,
			foods:"",
			popular:"",
			cosmetology:"",
			jewellery:"",
			list:["",""]
			
		}
	}
	
	
	render(){
		return (
			<div className="m-home">
				<header>
					
					<span className="name">星空购物</span>
					<Link to="/kindsousuo" className="title" >
						<span className="yo-ico search-icon">&#xe896;</span>
						<span className="txt">搜索商品名称或商品{this.props.value}</span>
					</Link>
					<Link to="/login" className="login">登录</Link>
				</header>
				
				<div className="box">
				<Scroller
				   
				    ref="scroller"
				    useLoadMore={true}
				    onLoad={() => {
				    	var that=this;
				       	$.ajax({ url: "http://xkgwsj.duapp.com/nav.php",
							success: function(res){
							var obj=JSON.parse(res)
							var vv6 =obj.list.map(function(val){
							return  (
									<li className="floor-recommend-item"> 
										<Link to="/detail">
											<div className="recommend-item-imgbox">
												<List.LazyImage src={val.url}
													defaultImage={null}
													style={{
														width: '100%'
														
													}}
												/>
											</div>
											<div className="recommend-item-name-wrapper">
												<span className="recommend-item-name">{val.name}</span>
											</div>
											<div className="recommend-item-price-wrapper">
												<span className="recommend-item-price">{val.price}</span>
											</div>
										</Link>
									</li>
									)
							})	
							that.setState({
								list:vv6
							})
							that.refs.scroller.stopLoading(true); // 这个调用也可以放在异步操作的回调里之后
				       	}
						})
					
				    }}
				>
				    
					<div className="box">
								
								<div className="swpier" id="top">
									<Carousel className="yo-carousel-a">
										{this.state.swiperList}
									</Carousel>
								</div>
								<ul className="Linklist">
									{this.state.linkto}
								</ul>
								<div className="floor">
									<div className="floor-top">
										<h2 className="floor-title">直播商品</h2>
										<Link to="/user">更多>></Link>
									</div>
									<ul className="floor-live">
										<li className="floor-live-item">
										    {this.state.floorlive}
										</li>
									</ul>
								</div>
								<div className="hot-product">
									<div className="hot-title-wrapper">
										<h2 className="hot-title">热销新品</h2>
									</div>
									<Scroller scrollX={true} scrollY={false}>
										<ul>
											{this.state.hotproduct}
										</ul>
									</Scroller>
								</div>
								<div className="floor1">
									<div className="floor-title-wrapper">
										<h2 className="floor-title">生活居家</h2>
									</div>
									<ul className="floor-productlist">
										{this.state.life}
									</ul>
								</div>
								<div className="floor1">
									<div className="floor-title-wrapper">
										<h2 className="floor-title">食品饮料</h2>
									</div>
										<ul className="floor-productlist">
										    {this.state.foods}
										</ul>
								</div>
								<div className="floor1">
									<div className="floor-title-wrapper">
										<h2 className="floor-title">流行精品</h2>
									</div>
									<ul className="floor-productlist">
										{this.state.popular}
									</ul>
								</div>
								<div className="floor1">
									<div className="floor-title-wrapper">
										<h2 className="floor-title">美容保健</h2>
									</div>
									<ul className="floor-productlist">
										{this.state.cosmetology}
									</ul>
								</div>
									<div className="floor1">
										<div className="floor-title-wrapper">
											<h2 className="floor-title">珠宝收藏</h2>
										</div>
										<ul className="floor-productlist">
										    {this.state.jewellery}
										</ul>	    
								</div>
								<div className="floor1 oo">
									<div className="floor-title-wrapper">
										<h2 className="floor-title">推荐商品</h2>
									</div>
									<ul className="tuijian-productlist">
										{this.state.list}
									</ul>
								</div>
								<ul className="footer-link">
						            <li><Link to="/login">登录</Link></li>
						            <li><Link to="/register">注册</Link></li>
						            <li><a href="#top">回到顶部</a></li>
						    	</ul>
					</div>
					
				</Scroller>
				</div>
				
			</div>
		)
	}
	
	
	componentDidMount() {
		var that=this
		$.ajax({ url: "http://xkgwsj.duapp.com/nav.php",
			success: function(res){
				//console.log(JSON.parse(res))
				var obj=JSON.parse(res)
				var lin = obj.nav.map(function(val){
					return val.title
				})
				var lin = obj.nav.map(function(val){
					return <Link to={val.title}><img src={val.url} /><span>{val.name}</span></Link>
				})
				var aa = 	<Link to="/detail">
			                    <span className="live-img">
			                        <img src={obj.floorLive.url} width="100%" />
			                    </span>
			                    <h3 className="floor-live-name">{obj.floorLive.name}</h3>
			                    <h4 className="floor-live-desc">{obj.floorLive.desc}</h4>
			                    <p className="floor-live-price">{obj.floorLive.price}</p>
			                </Link>
				var bb = obj.hotProduct.map(function(val){
					return <li><div className="div-img"><Link to="/detail"><img src={val.url} width="100%" /></Link></div><div><span className="hot-productprice">{val.price}</span></div></li>
					})	
				
				var vv1= obj.kindList[0].map(function(val){
					return  <li className="floor-productitem">
				                <Link to="/detail">
				                    <img src={val.url} width=" 100%"/>
				                </Link>
				                <span className="floor-productprice">{val.price}</span>
				                <span className="floor-productname">{val.name}</span>
				            </li>
				})
				var vv2 = obj.kindList[1].map(function(val){
					return  <li className="floor-productitem">
				                <Link to="/detail">
				                    <img src={val.url} width=" 100%"/>
				                </Link>
				                <span className="floor-productprice">{val.price}</span>
				                <span className="floor-productname">{val.name}</span>
				            </li>
				})
				var vv3 = obj.kindList[2].map(function(val){
					return  <li className="floor-productitem">
				                <Link to="/detail">
				                    <img src={val.url} width=" 100%"/>
				                </Link>
				                <span className="floor-productprice">{val.price}</span>
				                <span className="floor-productname">{val.name}</span>
				            </li>
				})
				var vv4 = obj.kindList[3].map(function(val){
					return  <li className="floor-productitem">
				                <Link to="/detail">
				                    <img src={val.url} width=" 100%"/>
				                </Link>
				                <span className="floor-productprice">{val.price}</span>
				                <span className="floor-productname">{val.name}</span>
				            </li>
				})
				var vv5 = obj.kindList[4].map(function(val){
					return  <li className="floor-productitem">
				                <Link to="/detail">
				                    <img src={val.url} width=" 100%"/>
				                </Link>
				                <span className="floor-productprice">{val.price}</span>
				                <span className="floor-productname">{val.name}</span>
				            </li>
				})
			
				
				that.setState({
					swiperList:[<li className="item"><img className="img" src={obj.banner} /></li>],
					linkto:lin,
					floorlive:aa,
					hotproduct:bb,
					life:vv1,
					foods:vv2,
					popular:vv3,
					cosmetology:vv4,
					jewellery:vv5
					
					
			    })
			}
		});
		
		
	}
	
	

}

export default Home
import React from 'react'

import {Link,browserHistory} from 'react-router'


class Detailxiangqing extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
	    	isLogin:"none",
	      	datalist:"sasas"
	    }
	}
	
	render() {
		return (
			<div className="m-xiangqing">
				<div className="nav-item">
			        <ul id="nav">
			            <li className="active" data-navcontent="productdetail">
			                <Link to="/detail/detailxiangqing/detailXiangqingJieshao">商品介绍</Link>
			            </li>
			            <li data-navcontent="productstandard">
			                <Link to="/detail/detailxiangqing/detailXiangqingCanshu">
			                    <span></span> 规格参数
			                </Link>
			            </li>
			        </ul>
			    </div>
			    <section className="nav">
					{this.props.children}
            		
            		
				</section>
			    
			    
			</div>
		)
	}
}

export default Detailxiangqing
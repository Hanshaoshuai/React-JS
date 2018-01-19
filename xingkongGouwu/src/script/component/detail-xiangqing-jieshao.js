import React from 'react'

import {Link,browserHistory} from 'react-router'


class Dailxiangqingjieshao extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
	    	isLogin:"none",
	      	datalist:"sasas"
	    }
	}
	
	render() {
		return (
			<div className="jieshao">
				<div className="content productdetail" id="productdetail">
			    	<p>
			    		<span>商品详情：</span>
			    	</p>
			    </div>
			</div>
		)
	}
}

export default Dailxiangqingjieshao
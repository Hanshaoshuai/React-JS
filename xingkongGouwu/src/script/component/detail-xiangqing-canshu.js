import React from 'react'

import {Link,browserHistory} from 'react-router'


class Detailxiangqingcanshu extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
	    	isLogin:"none",
	      	datalist:"sasas"
	    }
	}
	
	render() {
		return (
			<div className="canshu">
				<div className="content" id="productstandard">
			        <table cellspacing="1" cellpadding="0" border="1" width="100%">
			            <tbody>
	                        <tr>
	                            <th colspan="2">主体</th>
	                            <th></th>
	                        </tr>
                            <tr>
                                <td>材质</td>
                                <td>玉石</td>
                            </tr>
                            <tr>
                                <td>类别</td>
                                <td>其他</td>
                            </tr>
			            </tbody>
			        </table>
			    </div>
			</div>
		)
	}
}

export default Detailxiangqingcanshu
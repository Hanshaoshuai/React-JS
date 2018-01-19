
import React from 'react'

import {Link} from 'react-router'
import { connect } from 'react-redux'

import {mapStateToProps,mapDispatchToProps} from '../redux/store'


class Index extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			
		}
	}
	
	render() {
		return (
			<div className="m-index">
				<section>
					{this.props.children}
				</section>
				<footer>
					<ul>
						<li className="active">
							<Link to="/home" activeClassName="active">
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
				</footer>
			</div>
		)
	}
	
	
	
	componentDidUpdate() {
		let title = this.props.routes[1].title
		this.props.onChange({
			type:'SETTITLE',
			title:title
		})
	}
}


export default connect (
	mapStateToProps,
	mapDispatchToProps
)(Index)


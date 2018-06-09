import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// UI组件
// 不负责具体业务，所有的参数和方法，都通过props获得
class ContentComponent extends React.Component {

	componentDidMount() {
		fetch('./mock/articles.json').then((response) => {
			return response.json();
		}).then((json)=> {
			this.props.handleGetDataSucc(json.data.articles);
		})
	}

	render() {
		return (
			<div className="index-content">
				<Link to={'/zidingyi'}>跳转到zidingyi</Link>
			</div>
		)
	}

}


// React-redux 的connect 方法，会把UI组件，自动转化为一个容器组件，容器组件，有点类似以前我们的controller组件

function mapStateToProps(store) {  // state对应的就是全局的store
	console.log(store);
	return { 
		articles: store.articles
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleGetDataSucc: function(articles) {
			var action = {
				type: "FETCH_ARTICLES_SUCC",
				articles: articles
			}
			dispatch(action);
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)
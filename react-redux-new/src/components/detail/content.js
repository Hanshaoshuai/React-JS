import React from 'react';
import {connect} from 'react-redux';

// UI组件
// 不负责具体业务，所有的参数和方法，都通过props获得
class ContentComponent extends React.Component {

	componentDidMount() {
		
		fetch('/mock/article.json?id=' + this.props.id).then((response)=>{
			return response.json();
		}).then((json) => {
			this.props.handleGetDataSucc(json.data);
		})
	}

	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<div dangerouslySetInnerHTML={{__html:this.props.content}}></div>
			</div>
		)
	}

}


// React-redux 的connect 方法，会把UI组件，自动转化为一个容器组件，容器组件，有点类似以前我们的controller组件

function mapStateToProps(store, ownProps) {  // state对应的就是全局的store
	return { 
		title: store.title,
		content: store.content,
		id: ownProps.id,
		name: ownProps.name
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleGetDataSucc: function(data) {
			var action = {
				type: "FETCH_CONTENT_SUCC",
				content: data.content,
				title: data.title
			}
			dispatch(action);
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)
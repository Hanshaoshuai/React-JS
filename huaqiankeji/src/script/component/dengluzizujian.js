import React from 'react'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.zizujian, //来自子组件的值通过this.props.
      fu:''
    }
    console.log(this)
  }
  static jingtai(){ //静态函数用法
  	return this.prop
//	setTimeout(()=>{
////		alert('我是静态函数')
////			console.log(this);
//			return '我是静态函数'
////			this.constructor.setState({
////  		name:'我是静态函数'
////  	})
//	},3000)
  }
  render() {
  	let filter = [3, 5, 2, 2, 5, 5]
		var xingde=filter.filter(filter=>{
			if(filter==5){
				
			}else{
				return filter;
			}
		})
		console.log(xingde)
    return (
      <div ref="dom" id='dengluzizujian'>{ this.state.name }</div>
    )
  }
	componentWillMount(){
		setTimeout(()=>{
    	this.setState({
    		name:'我已经更给了'
    	})
    },2000)
	}
  componentDidMount() {
    console.log(this.refs.dom)			//获取dom元素
    this.props.todoFn('我来自子组件');  //向父组件传值
  }
//组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
//componentWillReceiveProps(nextProps){
//	if (nextProps.bool) {
//    this.setState({
//      bool: true
//    });
//  }
//}
}
Index.prop='我是静态属性啊'


export default Index
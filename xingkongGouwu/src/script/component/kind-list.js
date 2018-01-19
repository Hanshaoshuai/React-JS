import React from 'react'

import ReactDOM from 'react-dom'

//import kindlistchild from 'kindlistchild'

class Kindlist extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      datalist:"1"
    }
  }
	componentWillReceiveProps(){
  	var reqUrl = this.props.classID
  	this.setState({
			datalist:reqUrl
		})
  	console.log(reqUrl)
  }
  render() {
    return (
      <div className="m-kindlist">
      	<ul>
      		<li >
 				{this.state.datalist}
 			</li>
     	</ul>
      </div>
    )
  }
  
  
}

export default Kindlist

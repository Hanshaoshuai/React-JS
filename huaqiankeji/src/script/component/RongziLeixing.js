import React from 'react'

class RongziLeixing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: []
    }
  }
  xiaYibu(){
  	window.location.href='#/RongziYaosu';
  }
  render() {
    return (
    	<div id="RongziLeixing">
	      <div className="home">
					<div className="header">
						<ul>
							<li  className="header-bottom">
								<div className="header-left">
									<img className="img-left" src=""/>
									<img className="img-right" src="./img/qr-1.png"/>
								</div>
								<div className="header-right">
									<ul>
										<li className="img-top"><img src=""/></li>
										<li className="img-center">
											<p>布罗尔</p>
											<span>此房东</span>
											<font>的是否覆盖</font>
										</li>
										<li className="img-bottom"><img src="./img/qr-2.png"/></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div className="box">
						<div className="content-img">
							<span>我要融资</span>
						</div>
						<ul className="box-content">
							<li className="xinxi">
								<div className="xinxi-1"><span className="colors">请选择您的融资方式</span></div>
								<div  className="xinxi-3">
									<div className="xinxi-type">
										<div className="hangye-type">
											<span className="borders">定增</span>
											<span>做市</span>
											<span>转老股</span>
											<span>股权质押</span>
											<span>融资租赁</span>
											<span>研报支持</span>
											<span>公司调研</span>
										</div>
									</div>
								</div>
							</li>
							<li className="xiayibu" onClick={this.xiaYibu.bind(this)}>
								<p>下一步</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
    )
  }

  componentDidMount() {
	  
  }
}

export default RongziLeixing

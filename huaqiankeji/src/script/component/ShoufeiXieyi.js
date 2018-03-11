import React from 'react'

class ShoufeiXieyi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: []
    }
  }
  
  xiaYibu(){
  	window.location.href='#/YitouDi';
  }
  
  render() {
    return (
      <div id="ShoufeiXieyi">
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
						<ul className="box-content">
							<ul className="list">
								<div className="content-img"><img src="./img/qr-8.png"/></div>
								<li className="xinxi">
									<div className="xinxi-1"><span className="colors">若您本次投递的投资人及其所属投资机构：</span></div>
								</li>
								<div className="list-bottom">
									<p>1、通过企融直通车APP与您取得联系的</p>
									<p>2、通过企融直通车APP与您取得联系的</p>
									<p>3、通过企融直通车APP与您取得联系的</p>
									<p>4、通过企融直通车APP与您取得联系的</p>
									<p className="colors">我们将按照总投资的1%收取平台服务费</p>
								</div>
								<div className="chakan">
									<img src="./img/qr-9.png"/>
								</div>
							</ul>
							<li className="xiayibu" onClick={this.xiaYibu.bind(this)}>
								<p>同意协议，开始投递</p>
							</li>
							<li className="fangqi"><font>稍后处理</font><span>不同意，放弃</span></li>
						</ul>
					</div>
				</div>
      </div>
    )
  }

  componentDidMount() {
    
  }
}

export default ShoufeiXieyi

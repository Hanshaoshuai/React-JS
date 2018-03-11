import React from 'react'

class YitouDi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: []
    }
  }
  
  render() {
    return (
      <div id="YitouDi">
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
						<div className="content-img"><img src="./img/qr-12.png"/></div>
						<li className="xinxi">
							<div className="xinxi-1"><a href=""><span className="colors">返回首页</span></a></div>
						</li>
						<ul className="box-content">
							<ul className="list">
								<div className="list-top">
									<ol>
										<li className="top-img"><img src=""/></li>
										<li className="top-content">
											<div className="bottom-img1">
												<span>布罗尔</span>
											</div>
											<div className="bottom-img2">
												<span className="zhengquan">西部证券</span>
												<span>收获新三板项目数</span>
											</div>
											<div className="bottom-img3">
												<span  className="zhengquan">2017-10-2</span>
												<span>12:30</span>
											</div>
											<div className="bottom-img4">
												<font>投递成功</font>
											</div>
										</li>
									</ol>
								</div>
							</ul>
							<ul className="list">
								<div className="list-top">
									<ol>
										<li className="top-img"><img src=""/></li>
										<li className="top-content">
											<div className="bottom-img1">
												<span>布罗尔</span>
											</div>
											<div className="bottom-img2">
												<span className="zhengquan">西部证券</span>
												<span>收获新三板项目数</span>
											</div>
											<div className="bottom-img3">
												<span  className="zhengquan">2017-10-2</span>
												<span>12:30</span>
											</div>
											<div className="bottom-img4">
												<font className="toudi-color">投递成功</font>
											</div>
										</li>
									</ol>
								</div>
							</ul>
							<ul className="list">
								<div className="list-top">
									<ol>
										<li className="top-img"><img src=""/></li>
										<li className="top-content">
											<div className="bottom-img1">
												<span>布罗尔</span>
											</div>
											<div className="bottom-img2">
												<span className="zhengquan">西部证券</span>
												<span>收获新三板项目数</span>
											</div>
											<div className="bottom-img3">
												<span  className="zhengquan">2017-10-2</span>
												<span>12:30</span>
											</div>
											<div className="bottom-img4">
												<font className="toudi-color">投递成功</font>
											</div>
										</li>
									</ol>
								</div>
							</ul>
							
						</ul>
						<li className="xiayibu">
							<p><img src="./img/qr-13.png"/></p>
						</li>
					</div>
				</div>
      </div>
    )
  }

  componentDidMount() {
    
  }
}

export default YitouDi

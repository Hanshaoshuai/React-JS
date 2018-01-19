import React from 'react'

class RongziYaosu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: []
    }
  }
  
  xiaYibu(){
  	window.location.href='#/ShoufeiXieyi';
  }
  
  render() {
    return (
      <div id="RongziYaosu">
		    <div className="home">
					<div className="header">
						<ul>
							<li  className="header-bottom">
								<div className="header-left">
									<img className="img-left" src=""/>
									<img className="img-right" src="../../img/qr-1.png"/>
								</div>
								<div className="header-right">
									<ul>
										<li className="img-top"><img src=""/></li>
										<li className="img-center">
											<p>布罗尔</p>
											<span>此房东</span>
											<font>的是否覆盖</font>
										</li>
										<li className="img-bottom"><img src="../../img/qr-2.png"/></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div className="box">
						<div className="content-img"><img src="../../img/qr-3.png"/></div>
						<ul className="box-content">
							<li className="xinxi">
								<div className="xinxi-1"><span className="colors">01基本信息</span></div>
								<div className="xinxi-2 first">
									<div style={{position:'relative'}}>
										<span>*</span>
										<font>公司简称 :</font>
										<input style={{border:'none',outline:'none'}} placeholder="请输入您的公司简称"
											   name="phone"  className="txt-input JianCheng" type="text"/>
										<p id="tishi" style={{display:'none',width:'300px',height:'30px',fontSize:'16px',color:'red',position:'absolute',bottom:'-26px',left:'93px'}}>请先在移动端完成融资备案</p>
									</div>
									<div>
										<span>*</span>
										<font>公司简称 :</font>
										<input style={{border:'none',outline:'none'}} placeholder="请输入您的公司简称"
											   name="phone"  className="txt-input" type="text"/>
									</div>
									<div className="diqu">
										<span>*</span>
										<select name="select" id="select_k1" className="xla_k">
										    <option value="选择品牌">选择品牌</option>
											<option value="选择品牌1">选择品牌1</option>
											<option value="选择品牌2">选择品牌2</option>
										</select>
										<img src="../../img/anniu.png"/>
									</div>
								</div>
								<div className="xinxi-3">
									<div className="xinxi-type">
										<div className="hangye">
											<span>*</span>
											<font>所在行业 :</font>
										</div>
										<div className="hangye-type duoxuan">
											<span className="borders">所fh在行业</span>
											<span>所在h行业</span>
											<span>所在fh行业</span>
											<span>所f在行业</span>
											<span>所g在行业</span>
											<span>所在行业</span>
											<span>所在f行业</span>
											<span>所在行业</span>
											<span>所在行业</span>
											<span>所在行业</span>
										</div>
									</div>
									<p className="tishiBiaoqian" style={{display:'none', width:'300px',height:'30px',fontSize:'16px',color:'red',position:'absolute',bottom:'-32px',left:'20px'}}>行业标签不能多于3个，请重新选择</p>
								</div>
							</li>
							<li className="xinxi tuijian">
								<div className="xinxi-1"><span>02投资亮点</span></div>
								<div  className="xinxi-3">
									<div className="xinxi-type">
										<div className="hangye">
											<span>*</span>
										</div>
										<div style={{position:'relative',width:'96%'}} className="hangye-type">
											<textarea style={{width:'100%'}} placeholder="请简要概括该企业的主营业务及投资亮点，不少于100字" className="mint-field-core"></textarea>
											<ol style={{position:'absolute',bottom:'10px', right:'0px',width:'80px',height:'30px'}} className="textlength"><a style={{display:'inline-block'}} className="jisuan">0</a> / 200</ol>
											<p className="tishigo" style={{display:'none', width:'300px',height:'30px',fontSize:'16px',color:'red',position:'absolute',bottom:'-36px',left:'0px'}}>您的输入不足100字！</p>
										</div>
									</div>
								</div>
							</li>
							<li className="xinxi jingying">
								<div className="xinxi-1"><span>03经营数据</span></div>
								<div className="xinxi-2" id="xinxi-2">
									<p><span>*</span><font>上一财年经营业绩</font></p>
									<div className="yingye">
										<font>营业收入（亿元）</font>
										<input onkeyup= "if(! /^\d*\.{0,1}\d{0,2}$/.test(this.value)){alert('只能整数');this.value='';}" style={{border: 'none',outline:'none'}} placeholder="0"  className="txt-input inputs" type="text"/>
										<span></span>
										<font>营业收入（亿元）</font>
									</div>
									<p><span>*</span><font>今年预计经营业绩</font></p>
									<div className="yingye">
										<font>净利润（万元）</font>
										<input style={{border: 'none',outline:'none'}} placeholder="0"name="phone"  className="txt-input" type="text" />
										<span></span>
										<font>净利润（万元）</font>
										<input style={{border: 'none',outline:'none'}} placeholder="0"name="phone"  className="txt-input" type="text" />
									</div>
								</div>
							</li>
							<li className="xinxi jingying">
								<div className="xinxi-1"><span>04融资计划</span></div>
								<div className="xinxi-2" id="xinxi-2">
									<p><span>*</span><font>融资计划</font></p>
									<div className="yingye jihua">
										<font>融资估值（亿元）</font>
										<input style={{border: 'none',outline:'none'}} placeholder="0"name="phone"  className="txt-input inputs" type="text" />
										<span></span>
										<font>融资总额（亿元）</font>
										<input style={{border: 'none',outline:'none'}} placeholder="0"name="phone"  className="txt-input" type="text"/>
										<span></span>
										<font>每股价格（亿元）</font>
										<input style={{border: 'none',outline:'none'}} placeholder="0"name="phone"  className="txt-input" type="text" />
									</div>
								</div>
							</li>
							<li className="xinxi last">
								<div className="xinxi-1"><span className="colors">05上传文件</span></div>
								<div className="xinxi-2">
									<div className="shangchuan" style={{width:'308px'}}>
										<ol style={{marginLeft:'10px',display:'inline-block',float:'left'}}>商业计划书（PDF版）：</ol>
										<p style={{display:'inline-block',float:'left'}} className="texs">
											
										</p>
										<label>
											<input style={{border: 'none',outline:'none'}} index="0"
												 className="txt-input" type="file" onchange="previewImage(this)"/>
												 <font>上传</font>
										</label>
										<font style={{display:'none',position:'absolute',right:'10px',top:'10px',zIndex:'20', cursor:'pointer'}}  className="ShangGo">删除</font>
									</div>
								</div>
								<div className="xinxi-2">
									<div className="shangchuan">
										<ol style={{marginLeft:'10px',display:'inline-block',float:'left'}}>投资分析与尽调报告（PDF版）：</ol>
										<p style={{display:'inline-block',float:'left'}} className="texs">
											
										</p>
										<label>
											<input style={{border: 'none',outline:'none'}}
												name="phone" index="1" className="txt-input" type="file" onchange="previewImage(this)"/>
												<font>上传</font>
										</label>
										<font style={{display:'none',position:'absolute',right:'10px',top:'10px',zIndex:'20',cursor:'pointer'}} className="ShangGo">删除</font>
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

export default RongziYaosu

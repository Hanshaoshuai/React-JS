import React from 'react'

import { Link , browserHistory} from 'react-router'


class Kindsousuo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin:"none"
    }
    this.show=this.show.bind(this)
  }
  fanhui(){
		browserHistory.goBack()
	}
  show(){
		
		if(this.state.isLogin=="none"){
			this.setState({
				isLogin:"block"
			})
		}else{
			this.setState({
				isLogin:"none"
			})
		}
	}
  render() {
    return (
      <div className="m-sousuo">
        <header>
          <div className="yo-header-ab">
          	<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
            <h2 className="title">
	            <span className="sousuo">
	            	<input type="text" placeholder="搜索商品名称或商品编号"/>
	            	<font className="img1">
	            		<Link to="/">
	            			<img src="./iconfont/3_03.png"/>
	            		</Link>
	            	</font>
            	</span>
            </h2>
            <span className="img2" onClick={this.show}><img src="iconfont/03.png"/></span>
          </div>
        </header>
        <div className="nav-s" style={{display:this.state.isLogin}}>
        	<ul>
            <li className="active">
              <Link to="/home"  activeClassName="active">
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
        </div>
        <div className="sousuo-list">
        	<p>热门搜索</p>
        </div>
        <div className="sousuo-list-s">
        	<span><Link to="/kindsousuolist">表</Link></span>
        	<span><Link to="/kindsousuolist">酒</Link></span>
        	<span><Link to="/kindsousuolist">洗衣机</Link></span>
        	<span><Link to="/kindsousuolist">箱包</Link></span>
        	<span><Link to="/kindsousuolist">床品</Link></span>
        	<span><Link to="/kindsousuolist">美妆</Link></span>
        	<span><Link to="/kindsousuolist">鞋</Link></span>
        </div>
        
      </div>
    )
  }
}

export default Kindsousuo

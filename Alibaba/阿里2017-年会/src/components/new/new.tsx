import * as React from 'react'
import * as classnames from 'classnames'
import './new.less'


export default class NewFive extends React.Component<any, any> {
    state = {
        isHiddenNew: false
    }
    handleClose() {
        this.setState({
            isHiddenNew: true
        })
    }
    render() {
        return (
        <div className={classnames("new-mask",{"hidden":this.state.isHiddenNew})}>
            <div className="new-box">
                <h2 className="title">{this.props.title ? this.props.title : '新金融'}</h2>
                <div className="info">{this.props.info ? this.props.info : "必须去支持八二理论，支持那些80%的中小企业、个性化企业、年轻人、消费者。蚂蚁金服定位Tech-Fin，用技术和数据去支持传统零售做得更好，去支持传统金融行业转型升级，让他们做得更好。"}</div>
                <div className="img"><img alt="" src={this.props.newImg ? this.props.newImg : "https://img.alicdn.com/tfs/TB1FXWCSpXXXXaXXpXXXXXXXXXX-110-105.png"}/></div>
                <div className="btn">
                    <a href="#">{this.props.btnText ? this.props.btnText : "分享到内外广场"}</a>
                </div>
                <p className="tip">{this.props.tip ? this.props.tip : "分享到内外消息广场加200点能量"}</p>
                <div className="close"onClick={this.handleClose.bind(this)}>
                    <i className="iconfont icon-guanbi"></i>
                </div>
                <img className={classnames("img-left","img-left-top",{"hidden": this.props.img_position})} src="https://img.alicdn.com/tfs/TB10gmqSpXXXXX7XFXXXXXXXXXX-52-48.png"/>
                <img className={classnames("img-left img-left-bottom",{"hidden":!this.props.img_position})} src="https://img.alicdn.com/tfs/TB10gmqSpXXXXX7XFXXXXXXXXXX-52-48.png"/>
                <img className={classnames("img-right img-right-top",{"hidden":!this.props.img_position})}  src="https://img.alicdn.com/tfs/TB11X5ASpXXXXbiXpXXXXXXXXXX-40-45.png"/>
                <img className={classnames("img-right img-right-bottom",{"hidden":this.props.img_position})}  src="https://img.alicdn.com/tfs/TB11X5ASpXXXXbiXpXXXXXXXXXX-40-45.png"/>
            </div>
        </div>
        )
    }
}

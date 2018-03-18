import * as React from 'react'
import * as classnames from 'classnames'
import './dialog.less'

export default class Dialog extends React.Component<any, any> {
    state = {
        isShowDialog: false
    }
    handleClick() {
        this.setState({
            isShowDialog: true
        })
    }
    render() {
        return (
        <div className={classnames('dialog-mask',{'hidden':this.state.isShowDialog})}>
            {/* <div className="dialog-box">
               <div className="bg-top"></div>
               <div className="bg-bottom"></div>
               <div className="dialog-content">
                    <div className="bg-left"></div>
                    <div className="content">
                        <h2 className="title">弹窗样式</h2>
                        <div className="font">这张卡已经分享过一次，得到新卡再wdwdwdwdwd来吧~</div>
                        <button className="btn"onClick={this.handleClick.bind(this)}>知道啦</button>
                        <span className="star"></span> 
                    </div>
                    <div className="bg-right"></div>
               </div>
           </div>  */}
            <div className="test" >
                <h2 className="title">{this.props.title ? this.props.title : '弹窗样式'}</h2>
                <div className="font">{this.props.text ? this.props.text : '这张卡已经分享过一次，得到新卡再来吧~'}</div>
                <button onClick={this.handleClick.bind(this)} className="btn">{this.props.btn ? this.props.btn : '知道啦'}</button>
                <span className="star"></span>
           </div> 
        </div>
        )
    }
}

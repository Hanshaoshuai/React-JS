import * as React from 'react'
import * as classnames from 'classnames'
import EnergyCards from './home-energy-cards'

export default class HomeBanner extends React.Component<any, any> {
    state = {
        complete: false
    }
    
    toggleComplete = () => {
        this.setState({
            complete: !this.state.complete
        })
    }
    
    render() {
        return (<div className={classnames({
            'banner': true,
            'complete': this.state.complete,
        })}>
            <div className="banner-block">
                <p className="t1">ALIBABA NEW FIVE FIN</p>
                <p className="t2">阿里 • 聚五新</p>
                <p className="t3">2017阿里巴巴年会特别互动</p>

                <div className="btn-get-energy1">
                    <a
                        href="javascript:void(0)"
                        onClick={this.toggleComplete}
                    >
                        扫一扫聚能量
                    </a>
                </div>

                <div className="btn-get-energy2" onClick={this.toggleComplete}>
                    <a href="javascript:void(0)" className="">继续获取五新能量</a>
                </div>

                <div className="btn-get-energy3">
                    <a href="javascript:void(0)" className="">合成五新能量块</a>
                </div>
            </div>

            <EnergyCards />
        </div>)
    }
}

import * as React from 'react'
import * as classnames from 'classnames'
import avatarUrl from '../lib/avatarUrl'

export default class RankBanner extends React.Component<any, any> {

    getName(item) {
        return item.nickName || item.name || item.workNo;
    }

    render() {
        let { data } = this.props;
        data = data || [];
        if (data.length > 3) {
            data.length = 3;
        }

        return (<div className="rank-banner">
            <div className="title-container-2">
                <div className="title">前三名获得人气爆棚奖</div>
            </div>
            <div className="title-container">
                <div className="title">前三名获得人气爆棚奖</div>
            </div>

            <div className="background">
                {data.map((item, index) => {
                    return <div className={`top top-${index}`}>
                        <div className="img-container">
                            <img src={avatarUrl(item.workNo, 400)} />
                        </div>
                        <div className="text-container">
                            <div className="text"><i /><span>{`${this.getName(item)}${item.energyValue}能量`}</span></div>
                        </div>

                    </div>
                })}
                
            </div>
            <div className="line line-1" />
                <div className="line line-2" />
        </div>)
    }
}

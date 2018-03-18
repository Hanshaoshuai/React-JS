import * as React from 'react'
import * as classnames from 'classnames'
import { IFriend } from '../models/friend'
import displayName from '../lib/displayName'
import avatarUrl from '../lib/avatarUrl'

interface IFriendProps {
    readonly model: IFriend
}

export default class Friend extends React.Component<IFriendProps, any> {

    onAddEnergy = () => {
        // todo 加能量，放动画
    }

    render() {
        const { model, action, rank, index } = this.props

        return (<div className={classnames('friend', {
            'has-rank': rank,
        })}>
            <span className={`rank rank-${index}`}>{index > 3 ? index : <i />}</span>
            <img
                className="avatar"
                src={avatarUrl(model.workNo, 80)}
                alt="avatar" />
            <div className="intro">
                <p className="title">{displayName(model.name, model.nickName)}</p>
                <p className="subtitle">{
                    action ?
                        `${model.energyValue}五新能量`
                        :
                        `小伙伴为Ta增加了${model.energyValue}点五新能量`
                }</p>
            </div>
            <button className={classnames({
                'btn-add-energy': true,
                'disabled': !model.canGive,
                'hidden': !action,
            })} onClick={this.onAddEnergy}>
                <i className="iconfont icon-shandian" />
                加能量
            </button>
        </div>)
    }
}

Friend.defaultProps = {
    rank: false,
    action: true,
    index: 0,
};
import * as React from "react";
import * as classnames from 'classnames'
import { ICard } from '../../models/card'

interface IProgressProps {
    readonly text?:string
    readonly percent: number
}

export class Progress extends React.Component<IProgressProps, any> {
    public static defaultProps:IProgressProps = {
        text: '',
        percent: 0
    }

    render() {
        return (<div className="progress">
            <div
                className="progress-bar"
                style={{
                    width: `${this.props.percent}%`,
                }}
            />
            <div className="progress-inner">{this.props.text}</div>
        </div>)
    }
}

interface ICardProps {
    readonly className?: string
    readonly name?: string | number
    readonly score?: number
    readonly showName?: boolean
    readonly card: ICard
}

export class Card extends React.Component<ICardProps, any> {
    render() {
        return (<div className={classnames('card', this.props.className)}>
            <i className="card-icon" />
            <p className="card-name">{this.props.name}</p>
        </div>)
    }
}

export class UnknownCard extends React.Component<ICardProps, any> {
    render() {
        return <Card
            {...this.props}
            className={classnames('unclickable', this.props.className)}
        />
    }
}

export class NamedCard extends React.Component<ICardProps, any> {
    render() {
        const { showName, name, score, ...others } = this.props

        return <Card
            {...others}
            className={classnames({
                'clicked': showName,
                'clickable': !showName,
            })}
            name={showName ? name : score}
        />
    }
}

export default class EnergyCardPanel extends React.Component<any, any> {
    render() {
        return (<div className="energy-cards">
            <div className="cards">
                <div className="card clicked">
                    <i className="card-icon" />
                    <p className="card-name">新能源</p>
                </div>
                <div className="card clicked">
                    <i className="card-icon" />
                    <p className="card-name">新制造</p>
                </div>
                <div className="card clickable">
                    <i className="card-icon" />
                    <p className="card-name">5000</p>
                </div>
                <div className="card unclickable">
                    <i className="card-icon" />
                    <p className="card-name">7000</p>
                </div>
                <div className="card unclickable">
                    <i className="card-icon" />
                    <p className="card-name">10000</p>
                </div>
            </div>

            <Progress percent={50} text="5000 / 10000" />
        </div>)
    }
}

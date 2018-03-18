import * as React from "react";
import * as classnames from "classnames";

interface IProps {
    readonly visible: boolean
}

export class SearchItem extends React.Component<any, any> {
    render() {
        return (<div>todo</div>)
    }
}

export default class SearchPanel extends React.Component<IProps, any> {
    private $input

    componentWillReceiveProps(nextProps: IProps) {
        if (this.props.visible !== nextProps.visible && !nextProps.visible) {
            // todo 清空
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        // todo
    }

    render() {
        return (<form
            action="post"
            className={classnames({
                'search-panel': true,
                'visible': this.props.visible,
            })}
            onSubmit={this.onSubmit}
        >
            <input
                ref={v => (this.$input = v)}
                className="search-input"
                type="search"
            />
            <div className="search-body">

            </div>
        </form>)
    }
}

import './Container.less';

export default class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }

}

Container.displayName = 'Container';

Container.defaultProps = {
};

Container.propTypes = {
};

import * as React from 'react'
import { observer } from 'mobx-react'
import Header from '../../components/header/header'
import Banner from './home-banner'
import HomeTabs from './home-tabs'
import Message from '../../components/header/header-message'
import Award from '../../components/header/header-award'
import EnergyCards from './home-energy-cards'
@observer
export default class Home extends React.Component<any, any> {

    render() {
        return (
            <div className="page page-home">
                 <Header title="">
                    <Message />
                    <Award />
                </Header>
                <Banner /> 
                <EnergyCards />
                <HomeTabs history={this.props.history} />
            </div>
        );
    }
}

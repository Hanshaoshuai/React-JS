import React from 'react';
import HeaderComponent from '../common/header.js';
import FooterComponent from '../common/footer.js';
import ContentComponent from './content.js';


export default class IndexComponent extends React.Component {

	render() {
		return (
			<div>
				<HeaderComponent />
				<ContentComponent />
				<FooterComponent />
			</div>
		)
	}

}

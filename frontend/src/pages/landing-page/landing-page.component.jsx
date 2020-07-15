import React from 'react';
import './landing-page.styles.css';
import { LoginPopup } from '../../components/login-popup/login-popup.component';


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <p className="LandingPage-title">{this.props.title}</p>
                <img className="LandingPage-image" src={this.props.image}></img>
                <button className="LandingPage-button">Search</button> 
                <LoginPopup/>
            </div>
        )

    }
}

export { LandingPage }
import React from 'react';
import './landing-page.styles.css';
import { LoginPopup } from '../../components/login-popup/login-popup.component';
import { RegisterPopup } from '../../components/register-popup/register-popup.component'


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p className="LandingPage-title">{this.props.title}</p>
                <img className="LandingPage-image" src={this.props.image}></img>
                {this.props.render_login_popup &&
                    <div className="LandingPage-popup-container">
                        <LoginPopup/>
                    </div>
                }
                <button className="LandingPage-button">Search</button>                 
            </div>
        )

    }
}

export { LandingPage }
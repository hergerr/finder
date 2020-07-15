import React from 'react';
import './login-popup.styles.css';
import { InputAndLabel } from '../input-and-label/input-and-label.component';
import { PopupButton } from '../popup-button/popup-button.component';

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LoginPopup-container">
                <h3>Log in</h3>
                <InputAndLabel label="username" />
                <InputAndLabel label="password" />
                <div className="LoginPopup-links">
                    <p>No account?</p><p className="LoginPopup-register">Register</p>
                    <p className="LoginPopup-forgot">Forgot password?</p>
                </div>
                <PopupButton content="Log in"/>
            </div>
        )
    }
}

export { LoginPopup };
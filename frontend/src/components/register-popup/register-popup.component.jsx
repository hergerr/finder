import React from 'react';
import './register-popup.styles.css';
import { InputAndLabel } from '../input-and-label/input-and-label.component';
import { PopupButton } from '../popup-button/popup-button.component';


class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="RegisterPopup-container">
                <div className="RegisterPopup-form-wrapper">
                    <h3>Register</h3>
                    <InputAndLabel label="username" />
                    <InputAndLabel label="email" />
                    <InputAndLabel label="password" />
                    <InputAndLabel label="repeat password" />
                    
                    <div className="RegisterPopup-links">
                        <p>Already have an account?</p>
                        <p className="RegisterPopup-login">Log in</p>
                    </div>
                    <div className="RegisterPopup-button">
                        <PopupButton content="Log in" />
                    </div>
                </div>
            </div>
        )
    }
}

export { RegisterPopup };
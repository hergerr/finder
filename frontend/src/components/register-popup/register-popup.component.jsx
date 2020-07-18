import React from 'react';
import './register-popup.styles.css';
import { InputAndLabel } from '../input-and-label/input-and-label.component';
import { PopupButton } from '../popup-button/popup-button.component';
import { LoginPopup } from '../login-popup/login-popup.component';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true, loginVisible: false };
    }

    render() {
        let toRender = null;
        if (this.state.visible) {
            toRender = <div className="RegisterPopup-container">
                <FontAwesomeIcon icon={faTimes} className="LoginPopup-close" onClick={e => {
                    this.setState({
                        visible: false
                    })
                }} />
                <div className="RegisterPopup-form-wrapper">
                    <h3>Register</h3>
                    <InputAndLabel label="username" />
                    <InputAndLabel label="email" />
                    <InputAndLabel label="password" />
                    <InputAndLabel label="repeat password" />

                    <div className="RegisterPopup-links">
                        <p>Already have an account?</p>
                        <button className="RegisterPopup-login" onClick={e => {
                            this.setState({
                                loginVisible: true,
                                visible:false
                            });
                        }}>Log in</button>
                    </div>
                    <div className="RegisterPopup-button">
                        <PopupButton content="Register" />
                    </div>
                </div>
            </div>
        } else if (this.state.loginVisible) {
            toRender = <LoginPopup />
        }
        return (
            <div>
                {toRender}
            </div>
        )
    }
}

export { RegisterPopup };
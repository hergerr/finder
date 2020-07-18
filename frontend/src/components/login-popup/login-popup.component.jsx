import React from 'react';
import './login-popup.styles.css';
import { InputAndLabel } from '../input-and-label/input-and-label.component';
import { PopupButton } from '../popup-button/popup-button.component';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class LoginPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true }
    }

    render() {
        return (
            <div>
                {this.state.visible &&
                    <div className="LoginPopup-container">
                        <FontAwesomeIcon icon={faTimes} className="LoginPopup-close" onClick={e => {
                            this.setState({
                                visible: false
                            })
                        }} />
                        <div className="LoginPopup-form-wrapper">
                            <h3>Log in</h3>
                            <InputAndLabel label="username" />
                            <InputAndLabel label="password" />
                            <div className="LoginPopup-links">
                                <p>No account?</p><p className="LoginPopup-register">Register</p>
                                <p className="LoginPopup-forgot">Forgot password?</p>
                            </div>
                            <div className="LoginPopup-button">
                                <PopupButton content="Log in" />
                            </div>
                        </div>
                    </div>
                }
            </div>

        )
    }
}

export { LoginPopup };
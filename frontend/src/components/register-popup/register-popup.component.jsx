import React from 'react';
import styled from 'styled-components';
import { InputAndLabel } from '../input-and-label/input-and-label.component';
import { PopupButton } from '../popup-button/popup-button.component';
import { LoginPopup } from '../login-popup/login-popup.component';
import { Times } from '@styled-icons/fa-solid'


const Container = styled.div`
    background-color: white;
    padding: 20px;
    width: 500px;
    border: 1px solid black;
    opacity: 92%;
    border-radius: 20px;
`

const Cross = styled(Times)`
    position: absolute;
    top: 15px;
    right: 20px;
    width: 10px;
    cursor: pointer;
`

const FormWrapper = styled.form`
    width: 70%;
    margin: 0 auto;
`

const Title = styled.h3`
    text-align: center;
    font-size: 30px;
`

const Paragraph = styled.p`
    display: inline;
`

const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: right;
`

const Links = styled.div`
    margin-top: 20px;
`

const LoginButton = styled.button`
    color: #E46E00;
    background-color: white;
    border: none;
    display: inline;
    margin-left: 10px;
    cursor: pointer;
`

class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true, loginVisible: false };
    }

    render() {
        let toRender = null;
        if (this.state.visible) {
            toRender = <Container>
                <Cross onClick={e => {
                    this.setState({
                        visible: false
                    })
                }} />
                <FormWrapper>
                    <Title>Register</Title>
                    <InputAndLabel label="username" />
                    <InputAndLabel label="email" />
                    <InputAndLabel label="password" />
                    <InputAndLabel label="repeat password" />

                    <Links>
                        <Paragraph>Already have an account?</Paragraph>
                        <LoginButton onClick={e => {
                            this.setState({
                                loginVisible: true,
                                visible:false
                            });
                        }}>Log in</LoginButton>
                    </Links>
                    <ButtonWrapper>
                        <PopupButton content="Register" />
                    </ButtonWrapper>
                </FormWrapper>
            </Container>
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
import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputAndLabel } from './input-and-label.component';
import { PopupButton } from './popup-button.component';
import { RegisterPopup } from './register-popup.component';
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

// https://stackoverflow.com/questions/114543/how-to-horizontally-center-a-div
const FormWrapper = styled.form`
    width: 70%;
    margin: 0 auto;
`

const Title = styled.h3`
    text-align: center;
    font-size: 30px;
`

const Links = styled.div`
    margin-top: 10px;
`

const Paragraph = styled.p`
    display: inline;
`

const RegisterButton = styled.button`
    color: #E46E00;
    background-color: white;
    border: none;
    display: inline;
    margin-left: 10px;
    cursor: pointer;
`

const ForgotButton = styled.button`
    color: #E46E00;
    background-color: white;
    border: none;
    cursor: pointer;
    margin-left: 70px;
`

const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: right;
`

const Feedback = styled.div`
    color: red;
`

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true, registerVisible: false }
    }

    render() {
        return (
            <div>
                {this.state.visible &&
                    <Container>
                        <Cross onClick={e => {
                            this.setState({
                                visible: false
                            })
                        }} />
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}

                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .required('required'),
                                password: Yup.string()
                                    .required("required")
                            })}

                            onSubmit={values => {
                                alert(JSON.stringify(values));
                            }}
                        >
                            {props => (
                                <FormWrapper onSubmit={props.handleSubmit}>
                                    <Title>Log in</Title>
                                    <InputAndLabel label="username" name="username" id="username" value={props.values.username} onChange={props.handleChange} />
                                    {props.errors.username && <Feedback>{props.errors.username}</Feedback>}
                                    <InputAndLabel type="password" label="password" name="password" id="password" value={props.values.password} onChange={props.handleChange} />
                                    {props.errors.password && <Feedback>{props.errors.password}</Feedback>}
                                    <Links>
                                        <Paragraph>No account?</Paragraph>
                                        <RegisterButton to="/register" onClick={e => {
                                            this.setState({
                                                visible: false,
                                                registerVisible: true
                                            })
                                        }}>Register</RegisterButton>
                                        <ForgotButton to="/forgot">Forgot password?</ForgotButton>

                                    </Links>

                                    <ButtonWrapper>
                                        <PopupButton content="Log in" />
                                    </ButtonWrapper>
                                </FormWrapper>
                            )}

                        </Formik>


                    </Container>
                }

                {
                    this.state.registerVisible &&
                    <RegisterPopup />
                }

            </div>

        )
    }
}

export { LoginPopup };
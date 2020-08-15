import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { InputAndLabel } from './input-and-label.component';
import { PopupButton } from './popup-button.component';
import { Cross } from './cross.component';

const Container = styled.div`
    background-color: white;
    padding: 20px;
    width: 500px;
    border: 1px solid black;
    opacity: 92%;
    border-radius: 20px;
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
    constructor(props){
        super(props);
        this.state = {redirect: false}
    }

    render() {
        const redirect = this.state.redirect; 

        if (redirect) {
            return <Redirect push to='/account/messages' />
        }

        return (
            <div>
                <Container>
                    <Cross onClick={this.props.handleLoginClosing} />
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
                            axios.post(`http://127.0.0.1:8000/token/`, { username: values.username, password: values.password })
                            .then(res => {
                                if (res.status === 200) {
                                    localStorage.setItem('access', res.data.access)
                                    this.setState({redirect: true});
                                    this.props.handleLoginButtonChange();
                                }
                            })
                        }}
                    >
                        {props => (
                            <FormWrapper onSubmit={props.handleSubmit}>
                                <Title>Log in</Title>
                                <InputAndLabel label="username" name="username" id="username" value={props.values.username} onChange={props.handleChange} />
                                {props.errors.username && <Feedback>{props.errors.username}</Feedback>}
                                <InputAndLabel type="password" label="password" name="password" id="password" value={props.values.password} onChange={props.handleChange} />
                                {props.errors.password && <Feedback>{props.errors.password}</Feedback>}

                                <ButtonWrapper>
                                    <PopupButton content="Log in" />
                                </ButtonWrapper>
                            </FormWrapper>
                        )}

                    </Formik>

                    <Links>
                        <Paragraph>No account?</Paragraph>
                        <RegisterButton to="/register" onClick={this.props.handleSwitchVisibility}>Register</RegisterButton>
                        <ForgotButton to="/forgot">Forgot password?</ForgotButton>
                    </Links>

                </Container>

            </div>

        )
    }
}

export { LoginPopup };
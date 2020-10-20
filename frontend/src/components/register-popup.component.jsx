import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { InputAndLabel } from './input-and-label.component';
import { PopupButton } from './popup-button.component';
import { Cross } from './cross.component';
import { static_host } from '../assets/global-settings';


const Container = styled.div`
    background-color: white;
    padding: 20px;
    width: 500px;
    border: 1px solid black;
    opacity: 92%;
    border-radius: 20px;
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
    text-align: center;
`

const LoginButton = styled.button`
    color: #E46E00;
    background-color: white;
    border: none;
    display: inline;
    margin-left: 10px;
    cursor: pointer;
`

const Feedback = styled.div`
    color: red;
`

const SpanFeedback = styled.span`
    display: block;
    white-space: pre-line;
    margin-top: 10px;
    color: ${props => props.status === 'success' ? 'green' : 'red'};
`

class RegisterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: '', status: '' };
    }

    render() {
        return (
            <Container>
                <Cross onClick={this.props.handleRegisterClosing} />

                {/* https://formik.org/docs/api/formik */}
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        repeatedPassword: ''
                    }}

                    validationSchema={Yup.object({
                        username: Yup.string()
                            .required('required'),
                        email: Yup.string()
                            .email('invalid email address')
                            .required('required'),
                        password: Yup.string()
                            .required('password is required'),
                        repeatedPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'passwords must match')
                    })}

                    onSubmit={values => {
                        axios.post(`${static_host}/accounts/register/`,
                            // password_confirm required by Django REST Registration
                            { username: values.username, email: values.email, password: values.password, password_confirm: values.password })
                            .then(res => {
                                if (res.status === 201) {
                                    this.setState({ messages: "Registration was succesful. Now confirm your account by clicking URL sent to your email.", status: "success" })
                                }
                            }).catch(error => {
                                // https://github.com/axios/axios/issues/960
                                const errors = error.response.data;
                                let message = '';
                                for (const type in errors) {
                                    message = message.concat(`${errors[type]}`)
                                }
                                message = message.replace(/,/g, '\n');
                                this.setState({ messages: message, status: "fail" })
                            });
                    }}

                >

                    {props => (
                        <FormWrapper onSubmit={props.handleSubmit}>
                            <Title>Register</Title>
                            <InputAndLabel label="username" name="username" id="username" onChange={props.handleChange} value={props.values.username} />
                            {props.errors.username && <Feedback>{props.errors.username}</Feedback>}
                            <InputAndLabel label="email" name="email" id="email" onChange={props.handleChange} value={props.values.email} />
                            {props.errors.email && <Feedback>{props.errors.email}</Feedback>}
                            <InputAndLabel type="password" label="password" name="password" id="password" onChange={props.handleChange} value={props.values.password} />
                            {props.errors.password && <Feedback>{props.errors.password}</Feedback>}
                            <InputAndLabel type="password" label="repeat password" name="repeatedPassword" id="repeatedPassword" onChange={props.handleChange} value={props.values.repeatedPassword} />
                            {props.errors.repeatedPassword && <Feedback>{props.errors.repeatedPassword}</Feedback>}

                            <ButtonWrapper>
                                <PopupButton content="Register" />
                            </ButtonWrapper>
                        </FormWrapper>
                    )}

                </Formik>

                <SpanFeedback status={this.state.status}>
                    {this.state.messages}
                </SpanFeedback>

                <Links>
                    <Paragraph>Already have an account?</Paragraph>
                    <LoginButton onClick={this.props.handleSwitchVisibility}>Log in</LoginButton>
                </Links>
            </Container>
        )
    }
}

export { RegisterPopup };
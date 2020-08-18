import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as queryString from 'query-string';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { InputAndLabel } from '../components/input-and-label.component';
import { PopupButton } from '../components/popup-button.component';


const Container = styled.div`
    width: 100%;
    margin-top: 200px;
`

const FormWrapper = styled.form`
    width: 500px;
    margin: 0 auto;
    padding: 30px 30px 30px 40px;
    border: 1px solid var(--color-orange);
    border-radius: 10px;
`

const Manual = styled.p`
    margin-bottom: 30px;
`

const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: right;
`

const Feedback = styled.p`
    color: red;
`

const Message = styled.span`
    display: block;
    margin-top: 10px;
    color: ${props => props.status === 'success' ? 'green' : 'red'};
    text-align: center;
`


class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "" }
    }

    render() {
        const data = queryString.parse(this.props.history.location.search);

        return (
            <Container>
                <Formik
                    initialValues={{
                        password: '',
                    }}

                    validationSchema={Yup.object({
                        password: Yup.string()
                            .required('password is required'),
                        repeatedPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'passwords must match')

                    })}

                    onSubmit={values => {
                        axios.post(`http://localhost:8000/accounts/reset-password/`,
                            { user_id: data.user_id, timestamp: data.timestamp, password: values.password, signature: data.signature })
                            .then(res => {
                                if (res.status === 200) {
                                    this.setState({ message: "New password has been set. Now you can log in.", status: 'success' })
                                }
                            }).catch(error => {
                                // https://github.com/axios/axios/issues/960
                                const errors = error.response.data;
                                let message = '';
                                for (const type in errors) {
                                    message = message.concat(`${errors[type]}`)
                                }
                                message = message.replace(/,/g, '\n');
                                this.setState({ message: message, status: 'fail' });
                            });
                    }}
                >

                    {props => (
                        <FormWrapper onSubmit={props.handleSubmit}>
                            <Manual>
                                Type in your new password
                            </Manual>
                            <InputAndLabel type="password" label="password" name="password" id="password" onChange={props.handleChange} value={props.values.password} />
                            {props.errors.password && <Feedback>{props.errors.password}</Feedback>}
                            <InputAndLabel type="password" label="repeat password" name="repeatedPassword" id="repeatedPassword" onChange={props.handleChange} value={props.values.repeatedPassword} />
                            {props.errors.repeatedPassword && <Feedback>{props.errors.repeatedPassword}</Feedback>}

                            <ButtonWrapper>
                                <PopupButton content="Set password" />
                            </ButtonWrapper>

                            <Message status={this.state.status}>
                                {this.state.message}
                            </Message>

                        </FormWrapper>
                    )}

                </Formik>
            </Container>

        )
    }
}

export default withRouter(ResetPasswordPage);
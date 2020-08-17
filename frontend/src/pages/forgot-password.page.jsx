import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
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
    margin-bottom: 50px;
`

const ButtonWrapper = styled.div`
    margin-top: 20px;
    text-align: right;
`

const Feedback = styled.p`
    color: red;
`

export const ForgotPasswordPage = (props) => {
    const formik = useFormik({

        initialValues: {
            login: '',
        },
        validationSchema: Yup.object({
            login: Yup.string().required('required')
        }),
        onSubmit: values => {
            axios.post(`http://localhost:8000/accounts/send-reset-password-link/`,
                { login: values.login })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data)
                    }
                })

        },

    });

    return (
        <Container>
            <FormWrapper onSubmit={formik.handleSubmit}>
                <Manual>
                    Type in your username. Than, email with password reset will be sent.
                </Manual>
                <InputAndLabel label="username" id="login" name="login" onChange={formik.handleChange} value={formik.values.login} />
                {formik.touched.login && formik.errors.login ? (

                    <Feedback>{formik.errors.login}</Feedback>

                ) : null}
                <ButtonWrapper>
                    <PopupButton content="Reset" />
                </ButtonWrapper>
            </FormWrapper>
        </Container>
    )

}
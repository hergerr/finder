import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SearchButton } from '../components/search-button.component';
import { static_host } from '../assets/global-settings';


const ContactContainer = styled.div`
    width: 100%;
    background-color: white;
    height: 400px;
`

const ContactTitle = styled.h3`
    font-size: 40px;
    text-align: center;
    font-weight: 100;
    margin-top: 30px;
`

const ContactContentWrapper = styled.div`
    display:flex;
    width: 100%;
    height: 300px;
`

const Phone = styled.div`
    margin-top: 100px;
    font-size: 30px;
    width: 50%;
    text-align:center;

`

const FormWrapper = styled.form`
    display: flex;
    flex-direction:column;
    margin-top: 60px;
    margin: 0 auto;
    align-items: center;

    button {
        float: right;
        text-align: right;
    }
`

const Feedback = styled.p`
    color: ${props => props.status === 'success' ? 'green' : 'red'};
`

const TextArea = styled.textarea`
    width: 300px;
    height: 200px;
    margin-bottom: 10px;
`

export const ContactBox = (props) => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const formik = useFormik({

        initialValues: {
            message: '',
        },

        validationSchema: Yup.object({
            message: Yup.string().required('cannot be empty')
        }),

        onSubmit: values => {
            axios.post(`${static_host}/send_message/`, { content: values.message, receiver: props.receiver, subject: props.subject }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
            }).then(res => {
                if (res.status === 200) {
                    setMessage('Message sent succesfully');
                    setStatus('success');
                }
            }).catch(error => {
                const errors = error.response.data;
                let message = '';
                for (const type in errors) {
                    message = message.concat(`${errors[type]}`)
                }
                message = message.replace(/,/g, '\n');
                setMessage(message);
                setStatus('fail');
            });

        },

    });

    return (
        <ContactContainer>
            <ContactTitle>Contact</ContactTitle>

            <ContactContentWrapper>
                <Phone>{props.phone}</Phone>
                <FormWrapper onSubmit={formik.handleSubmit}>
                    <TextArea name="message" id="message" onChange={formik.handleChange} value={formik.values.message} />
                    <SearchButton>Send</SearchButton>
                    <Feedback status={status}>
                        {message}
                    </Feedback>
                </FormWrapper>
            </ContactContentWrapper>
        </ContactContainer>
    )

}
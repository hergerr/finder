import React from 'react';
import styled from 'styled-components';
import { SearchButton } from '../components/search-button.component';


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

const TextArea = styled.textarea`
    width: 300px;
    height: 200px;
    margin-bottom: 10px;
`

export const ContactBox = (props) => (
    <ContactContainer>
        <ContactTitle>Contact</ContactTitle>

        <ContactContentWrapper>
            <Phone>{props.phone}</Phone>
            <FormWrapper>
                <TextArea />
                <SearchButton>Send</SearchButton>
            </FormWrapper>
        </ContactContentWrapper>
    </ContactContainer>
)
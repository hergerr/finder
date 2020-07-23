import React from 'react';
import { TwoInputsAndLabel } from '../two-inputs-and-label/two-inputs-and-label.component';
import { InputAndLabel } from '../input-and-label/input-and-label.component';
import { RadioButtonAndLabel } from '../radio-button-and-label/radio-button-and-label.component';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    opacity: 90;
    background-color: white;
`

const FormWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
`

export const MatePopup = (props) => (
    <Container>
        <FormWrapper>
            <TwoInputsAndLabel label="Age" />
            <TwoInputsAndLabel label="Wakes up" />
            <TwoInputsAndLabel label="Goes to bed" />
            <InputAndLabel label="District" />
            <RadioButtonAndLabel label="Pets"/>
            <RadioButtonAndLabel label="Smoking"/>
        </FormWrapper>
    </Container>
)
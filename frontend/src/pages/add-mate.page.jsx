import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { InputAndLabel } from '../components/input-and-label.component';
import { TwoInputsAndLabel } from '../components/two-inputs-and-label.component';
import { CheckboxAndLabel } from '../components/checkbox-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { FeatureBox } from '../components/feature-box.component';
import { AddButton } from '../components/add-button.component';

const Container = styled.div`
    width: 70%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
`

const SecondRow = styled.div`
    display: flex;
`

const ThirdRow = styled.div`
    width: 570px;
    display: flex;
`

const ForthRow = styled.div`
    width: 200px;
`

const Features = styled.div`
    margin-top: 70px;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    font-size: 25px;
`

const Description = styled.p`
    font-size: 15px;
`

const BoxesWrapper = styled.div`
    display:flex;
`

const FormWrapper = styled.form`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 500px;
`



class AddMatePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <InputAndLabel label="Title" />
                {/* todo: Photos */}

                <SecondRow>
                    <SmallInputAndLabel label="Age" />
                    <SmallInputAndLabel label="Field of study" />
                </SecondRow>

                <ThirdRow>
                    <TwoInputsAndLabel label="Goes to bed" />
                    <TwoInputsAndLabel label="Wakes up" />
                </ThirdRow>

                <ForthRow>
                    <CheckboxAndLabel label="Pets" />
                    <CheckboxAndLabel label="Parties" />
                </ForthRow>

                <Features>
                    <Title>Personal features</Title>
                    <Description>Write your features or things you enjoy</Description>
                
                    <BoxesWrapper>
                        <FeatureBox content="quiet"/>
                        <FeatureBox content="peaceful"/>
                        <FeatureBox content="gaming"/>
                        <FeatureBox content="cycling"/>
                    </BoxesWrapper>
                </Features>

                <FormWrapper>
                    <SmallInputAndLabel label="Add"/>
                    <AddButton content="OK"/>
                </FormWrapper>

            </Container>
        )
    }

}

export { AddMatePage }
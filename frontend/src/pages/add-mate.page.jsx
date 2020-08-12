import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from "formik";
import { InputAndLabel } from '../components/input-and-label.component';
import { TwoInputsAndLabel } from '../components/two-inputs-and-label.component';
import { CheckboxAndLabel } from '../components/checkbox-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { FeatureBox } from '../components/feature-box.component';
import { AddButton } from '../components/add-button.component';
import { UploadField } from '../components/upload-field.component';
import { SearchButton } from '../components/search-button.component';

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

const BigForm = styled.form`
`


class AddMatePage extends React.Component {

    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        title: 'adsdasd',
                        age: 0,
                        field_of_study: '',
                        goes_to_bed: 0,
                        wakes_up: 0,
                        pets: false,
                        parties: false,
                    }}

                    validationSchema={Yup.object({
                        age: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        goes_to_bed: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        wakes_up: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        field_of_study: Yup.string()
                            .required('cannot be empty'),
                        title: Yup.string()
                            .required('cannot be empty'),
                    })}

                    onSubmit={values => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {props => (
                        <BigForm onSubmit={props.handleSubmit}>

                            <InputAndLabel label="Title" id="title" name="title" value={props.values.title} onChange={props.handleChange}/>

                            <SecondRow>
                                <SmallInputAndLabel label="Age" id="age" name="age" value={props.values.age} onChange={props.handleChange}/>
                                <SmallInputAndLabel label="Field of study" id="field_of_study" name="field_of_study" value={props.values.field_of_study} onChange={props.handleChange}/>
                            </SecondRow>

                            <ThirdRow>
                                <TwoInputsAndLabel label="Goes to bed" id="goes_to_bed" name="goes_to_bed" value={props.values.goes_to_bed} onChange={props.handleChange}/>
                                <TwoInputsAndLabel label="Wakes up" id="wakes_up" name="wakes_up" value={props.values.wakes_up} onChange={props.handleChange}/>
                            </ThirdRow>

                            <ForthRow>
                                <CheckboxAndLabel label="Pets" id="pets" name="pets" value={props.values.pets} onChange={props.handleChange}/>
                                <CheckboxAndLabel label="Parties" id="parties" name="parties" value={props.values.parties} onChange={props.handleChange}/>
                            </ForthRow>

                            <SearchButton>Submit</SearchButton>
                        </BigForm>
                    )}
                </Formik>


                <Features>
                    <Title>Personal features</Title>
                    <Description>Write your features or things you enjoy</Description>

                    <BoxesWrapper>
                        <FeatureBox content="quiet" />
                        <FeatureBox content="peaceful" />
                        <FeatureBox content="gaming" />
                        <FeatureBox content="cycling" />
                    </BoxesWrapper>
                </Features>

                <FormWrapper>
                    <SmallInputAndLabel label="Add" />
                    <AddButton content="OK" />
                </FormWrapper>

            </Container>
        )
    }

}

export { AddMatePage }
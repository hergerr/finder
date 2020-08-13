import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import FormData from 'form-data';
import axios from 'axios';
import { Formik } from "formik";
import { InputAndLabel } from '../components/input-and-label.component';
import { TwoInputsAndLabel } from '../components/two-inputs-and-label.component';
import { CheckboxAndLabel } from '../components/checkbox-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { FeatureBox } from '../components/feature-box.component';
import { AddButton } from '../components/add-button.component';
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
                        field_of_study: 'a',
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
                        // https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
                        let data = new FormData();
                        data.append('image', values.file, values.file.fileName);
                        data.append('title', values.title);
                        data.append('field_of_study', values.field_of_study);
                        data.append('age', values.age);
                        data.append('location', 'Plac');
                        data.append('features', 'peaceful;quiet;gaming;cycling');
                        data.append('customs', 'no smoking;no partying;wakes up at 11-12;goes to bed 23-24');
                        data.append('phone', '123456789');
                        
                        axios.post('http://localhost:8000/user_mate_detail/', data, {
                            headers: {
                                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                                'Authorization': `Bearer ${localStorage.getItem('access')}`
                              }
                        })

                        console.log({
                            fileName: values.file.name,
                            type: values.file.type,
                            size: `${values.file.size} bytes`
                        })
                        console.log(values);
                    }}
                >
                    {props => (
                        <BigForm onSubmit={props.handleSubmit}>

                            <InputAndLabel label="Title" id="title" name="title" value={props.values.title} onChange={props.handleChange} />

                            <input id="file" name="file" type="file" onChange={(event) => {
                                props.setFieldValue("file", event.currentTarget.files[0]);
                            }} />

                            <SecondRow>
                                <SmallInputAndLabel label="Age" id="age" name="age" value={props.values.age} onChange={props.handleChange} />
                                <SmallInputAndLabel label="Field of study" id="field_of_study" name="field_of_study" value={props.values.field_of_study} onChange={props.handleChange} />
                            </SecondRow>

                            <ThirdRow>
                                <TwoInputsAndLabel label="Goes to bed" id="goes_to_bed" name="goes_to_bed" value={props.values.goes_to_bed} onChange={props.handleChange} />
                                <TwoInputsAndLabel label="Wakes up" id="wakes_up" name="wakes_up" value={props.values.wakes_up} onChange={props.handleChange} />
                            </ThirdRow>

                            <ForthRow>
                                <CheckboxAndLabel label="Pets" id="pets" name="pets" value={props.values.pets} onChange={props.handleChange} />
                                <CheckboxAndLabel label="Parties" id="parties" name="parties" value={props.values.parties} onChange={props.handleChange} />
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
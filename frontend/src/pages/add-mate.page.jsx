import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import FormData from 'form-data';
import axios from 'axios';
import { Formik } from "formik";
import { InputAndLabel } from '../components/input-and-label.component';
import { CheckboxAndLabel } from '../components/checkbox-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { SearchButton } from '../components/search-button.component';
import { FileInput } from '../components/file-input.component';

const Container = styled.div`
    width: 70%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
`

const SecondRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const ThirdRow = styled.div`
    width: 570px;
    display: flex;
`

const ForthRow = styled.div`
`

const FifthRow = styled.div`
`

// const Features = styled.div`
//     margin-top: 70px;
//     display: flex;
//     flex-direction: column;
// `

// const Title = styled.h3`
//     font-size: 25px;
// `

// const Description = styled.p`
//     font-size: 15px;
// `

// const BoxesWrapper = styled.div`
//     display:flex;
// `

// const FormWrapper = styled.form`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     width: 500px;
// `

const BigForm = styled.form`
`

const ButtonWrapper = styled.div`
    text-align: center;
    margin: 10px 0;
`

const Feedback = styled.div`
    color: red;
`


class AddMatePage extends React.Component {

    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        title: '',
                        field_of_study: '',
                        age: '',
                        pets: false,
                        parties: false,
                        features: '',
                        customs: '',
                        location: '',
                        phone: '',
                    }}

                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('cannot be empty'),
                        age: Yup.number()
                            .min(0, 'Must be greater or equal 0')
                            .required('cannot be empty'),
                        goes_to_bed: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        wakes_up: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        field_of_study: Yup.string()
                            .required('cannot be empty'),
                        location: Yup.string()
                            .required('cannot be empty'),
                        phone: Yup.string()
                            .required('cannot be empty'),
                        features: Yup.string()
                            .required('cannot be empty'),
                        customs: Yup.string()
                            .required('cannot be empty')
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
                        data.append('phone', values.phone);

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
                            {props.errors.title && <Feedback>{props.errors.title}</Feedback>}
                            <FileInput setFieldValue={props.setFieldValue} />

                            <SecondRow>
                                <SmallInputAndLabel pos="left" label="Age" id="age" name="age" value={props.values.age} onChange={props.handleChange} />
                                {props.errors.age && <Feedback>{props.errors.age}</Feedback>}
                                <SmallInputAndLabel pos="left" label="Field of study" id="field_of_study" name="field_of_study" value={props.values.field_of_study} onChange={props.handleChange} />
                                {props.errors.field_of_study && <Feedback>{props.errors.field_of_study}</Feedback>}
                                <SmallInputAndLabel pos="left" label="Phone" id="phone" name="phone" value={props.values.phone} onChange={props.handleChange} />
                                {props.errors.phone && <Feedback>{props.errors.phone}</Feedback>}
                                <SmallInputAndLabel pos="left" label="Location" id="location" name="location" value={props.values.location} onChange={props.handleChange} />
                                {props.errors.location && <Feedback>{props.errors.location}</Feedback>}
                            </SecondRow>

                            <ThirdRow>
                                <CheckboxAndLabel label="Pets" id="pets" name="pets" value={props.values.pets} onChange={props.handleChange} />
                                {props.errors.pets && <Feedback>{props.errors.pets}</Feedback>}
                                <CheckboxAndLabel label="Parties" id="parties" name="parties" value={props.values.parties} onChange={props.handleChange} />
                                {props.errors.parties && <Feedback>{props.errors.parties}</Feedback>}
                            </ThirdRow>

                            <ForthRow>
                                <InputAndLabel label="Personal features. Separtate with semicolon" id="features" name="features" value={props.values.features} onChange={props.handleChange} />
                                {props.errors.features && <Feedback>{props.errors.features}</Feedback>}
                            </ForthRow>

                            <FifthRow>
                                <InputAndLabel label="Customs. Separtate with semicolon" id="customs" name="customs" value={props.values.customs} onChange={props.handleChange} />
                                {props.errors.customs && <Feedback>{props.errors.customs}</Feedback>}
                            </FifthRow>

                            <ButtonWrapper>
                                <SearchButton>Submit</SearchButton>
                            </ButtonWrapper>
                        </BigForm>
                    )}
                </Formik>


                {/* <Features>
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
                </FormWrapper> */}

            </Container>
        )
    }

}

export { AddMatePage }
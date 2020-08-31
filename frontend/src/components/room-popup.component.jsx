import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TwoInputsAndLabel } from './two-inputs-and-label.component';
import { InputAndLabel } from './input-and-label.component';
import { SearchButton } from './search-button.component';
import { Cross } from './cross.component';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    padding: 30px 0px;
    background-color: white;
`

const FormWrapper = styled.form`
    width: 70%;
    margin: 0 auto;
`

const ButtonWrapper = styled.div`
    text-align: center;
    margin: 10px 0;
`

export const RoomPopup = (props) => {
    let history = useHistory();
    
    const formik = useFormik({
        initialValues: {
            priceFrom: 0,
            priceTo: 1000,
            roomAreaFrom: 0,
            roomAreaTo: 20,
            location: '',
            number_of_flatmates: '',
            building_features: '',
            flat_features: '',
            flatmates_features: '',
            rules: '',
        },

        validationSchema: Yup.object({
            priceFrom: Yup.number()
                .min(0, 'Must be greater or equal 0'),
            priceTo: Yup.number()
                .min(0, 'Must be greater or equal 0'),
            roomAreaFrom: Yup.number()
                .min(0, 'Must be greater or equal 0'),
            roomAreaTo: Yup.number()
                .min(0, 'Must be greater or equal 0'),
        }),

        onSubmit: values => {
            history.push(`/room/list?priceFrom=${values.priceFrom}&priceTo=${values.priceTo}&roomAreaFrom=${values.roomAreaFrom}&roomAreaTo=${values.roomAreaTo}&location=${values.location}&numberOfFlatmates=${values.number_of_flatmates}&buildingFeatures=${values.building_features}&flatFeatures=${values.flat_features}&flatmatesFeatures=${values.flatmates_features}&rules=${values.rules}`);
        },
    });

    return (
        <Container>
            <Cross onClick={props.closeHandler} />
            <FormWrapper onSubmit={formik.handleSubmit}>
                <TwoInputsAndLabel label="Price" idFrom="priceFrom" idTo="priceTo" nameFrom="priceFrom" nameTo="priceTo" onChange={formik.handleChange} valueFrom={formik.values.priceFrom} valueTo={formik.values.priceTo} />
                {formik.touched.priceFrom && formik.errors.priceFrom ? (
                    <div>{formik.errors.priceFrom}</div>
                ) : null}
                {formik.touched.priceTo && formik.errors.priceTo ? (
                    <div>{formik.errors.priceTo}</div>
                ) : null}
                <TwoInputsAndLabel label="Room area" idFrom="roomAreaFrom" idTo="roomAreaTo" nameFrom="roomAreaFrom" nameTo="roomAreaTo" onChange={formik.handleChange} valueFrom={formik.values.roomAreaFrom} valueTo={formik.values.roomAreaTo} />
                {formik.touched.roomAreaFrom && formik.errors.roomAreaFrom ? (
                    <div>{formik.errors.roomAreaFrom}</div>
                ) : null}
                {formik.touched.roomAreaTo && formik.errors.roomAreaTo ? (
                    <div>{formik.errors.roomAreaTo}</div>
                ) : null}
                <InputAndLabel label="Location" id="location" name="location" onChange={formik.handleChange} value={formik.values.location} />
                <InputAndLabel type="number" label="Number of Flatmates" id="number_of_flatmates" name="number_of_flatmates" onChange={formik.handleChange} value={formik.values.number_of_flatmates} />
                <InputAndLabel label="Building Features" id="building_features" name="building_features" onChange={formik.handleChange} value={formik.values.building_features} />
                <InputAndLabel label="Flat Features" id="flat_features" name="flat_features" onChange={formik.handleChange} value={formik.values.flat_features} />
                <InputAndLabel label="Flatmates Features" id="flatmates_features" name="flatmates_features" onChange={formik.handleChange} value={formik.values.flatmates_features} />
                <InputAndLabel label="Rules" id="rules" name="rules" onChange={formik.handleChange} value={formik.values.rules} />
                <ButtonWrapper>
                    <SearchButton>Submit</SearchButton>
                </ButtonWrapper>
            </FormWrapper>
        </Container>
    )
}
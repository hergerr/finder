import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TwoInputsAndLabel } from './two-inputs-and-label.component';
import { InputAndLabel } from './input-and-label.component';
import { CheckboxAndLabel } from './checkbox-and-label.component';
import { SearchButton } from './search-button.component';
import { Cross } from './cross.component';

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    opacity: 90;
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
    const formik = useFormik({
        initialValues: {
            priceFrom: 0,
            priceTo: 1000,
            district: '',
            roomAreaFrom: 0,
            roomAreaTo: '',
            flatmates: '',
            pets: false,
            smoking: false,
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
            alert(JSON.stringify(values, null, 2));
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
                <InputAndLabel label="District" id="district" name="district" onChange={formik.handleChange} value={formik.values.district} />
                <TwoInputsAndLabel label="Room area" idFrom="roomAreaFrom" idTo="roomAreaTo" nameFrom="roomAreaFrom" nameTo="roomAreaTo" onChange={formik.handleChange} valueFrom={formik.values.roomAreaFrom} valueTo={formik.values.roomAreaTo} />
                {formik.touched.roomAreaFrom && formik.errors.roomAreaFrom ? (
                    <div>{formik.errors.roomAreaFrom}</div>
                ) : null}
                {formik.touched.roomAreaTo && formik.errors.roomAreaTo ? (
                    <div>{formik.errors.roomAreaTo}</div>
                ) : null}
                <InputAndLabel label="Flatmates" id="flatmates" name="flatmates" onChange={formik.handleChange} value={formik.values.flatmates} />
                <CheckboxAndLabel label="Pets" id="pets" name="pets" onChange={formik.handleChange} value={formik.values.pets} />
                <CheckboxAndLabel label="Smoking" id="smoking" name="smoking" onChange={formik.handleChange} value={formik.values.smoking} />
                <ButtonWrapper>
                    <SearchButton>Submit</SearchButton>
                </ButtonWrapper>
            </FormWrapper>
        </Container>
    )
}
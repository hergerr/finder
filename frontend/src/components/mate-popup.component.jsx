import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TwoInputsAndLabel } from './two-inputs-and-label.component';
import { InputAndLabel } from './input-and-label.component';
import { CheckboxAndLabel } from './checkbox-and-label.component';
import { SearchButton } from './search-button.component';

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

export const MatePopup = (props) => {
    const formik = useFormik({
        initialValues: {
            ageFrom: 0,
            ageTo: 100,
            wakeFrom: 0,
            wakeTo: 24,
            bedFrom: 0,
            bedTo: 24,
            district: '',
            pets: false,
            smoking: false,
        },

        validationSchema: Yup.object({
            ageFrom: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(100, 'Must be less or equal 100'),
            ageTo: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(100, 'Must be less or equal 100'),
            wakeFrom: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(24, 'Must be less or equal 24'),
            wakeTo: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(24, 'Must be less or equal 24'),
            bedFrom: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(24, 'Must be less or equal 24'),
            bedTo: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(24, 'Must be less or equal 24'),
        }),

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Container>
            <FormWrapper onSubmit={formik.handleSubmit}>
                <TwoInputsAndLabel label="Age" idFrom="ageFrom" idTo="ageTo" nameFrom="ageFrom" nameTo="ageTo" onChange={formik.handleChange} valueFrom={formik.values.ageFrom} valueTo={formik.values.ageTo} />
                {/* komunikat jesli walidacja sie nie powiedzie */}
                {formik.touched.ageFrom && formik.errors.ageFrom ? (
                    <div>{formik.errors.ageFrom}</div>
                ) : null}
                {formik.touched.ageTo && formik.errors.ageTo ? (
                    <div>{formik.errors.ageTo}</div>
                ) : null}
                <TwoInputsAndLabel label="Wakes up" idFrom="wakeFrom" idTo="wakeTo" nameFrom="wakeFrom" nameTo="wakeTo" onChange={formik.handleChange} valueFrom={formik.values.wakeFrom} valueTo={formik.values.wakeTo} />
                {formik.touched.wakeFrom && formik.errors.wakeFrom ? (
                    <div>{formik.errors.wakeFrom}</div>
                ) : null}
                {formik.touched.wakeTo && formik.errors.wakeTo ? (
                    <div>{formik.errors.wakeTo}</div>
                ) : null}
                <TwoInputsAndLabel label="Goes to bed" idFrom="bedFrom" idTo="bedTo" nameFrom="bedFrom" nameTo="bedTo" onChange={formik.handleChange} valueFrom={formik.values.bedFrom} valueTo={formik.values.bedTo} />
                {formik.touched.bedFrom && formik.errors.bedFrom ? (
                    <div>{formik.errors.bedFrom}</div>
                ) : null}
                {formik.touched.bedTo && formik.errors.bedTo ? (
                    <div>{formik.errors.bedTo}</div>
                ) : null}
                <InputAndLabel label="District" id="district" name="district" onChange={formik.handleChange} value={formik.values.district} />
                <CheckboxAndLabel label="Pets" id="pets" name="pets" onChange={formik.handleChange} value={formik.values.pets} />
                <CheckboxAndLabel label="Smoking" id="smoking" name="smoking" onChange={formik.handleChange} value={formik.values.smoking} />
                <ButtonWrapper>
                    <SearchButton>Submit</SearchButton>
                </ButtonWrapper>
            </FormWrapper>
        </Container>
    )
}
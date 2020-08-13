import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TwoInputsAndLabel } from './two-inputs-and-label.component';
import { InputAndLabel } from './input-and-label.component';
import { SearchButton } from './search-button.component';
import { Cross } from './cross.component';
import { useHistory } from "react-router-dom";


const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    padding: 30px 0px;
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
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            ageFrom: 0,
            ageTo: 100,
            customs: '',
            features: '',
            district: ''
        },

        validationSchema: Yup.object({
            ageFrom: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(100, 'Must be less or equal 100'),
            ageTo: Yup.number()
                .min(0, 'Must be greater or equal 0')
                .max(100, 'Must be less or equal 100'),
        }),

        onSubmit: values => {
            history.push(`/mate/list/${values.ageFrom}/${values.ageTo}/${values.district}/${values.features}/${values.customs}`);
        },
    });

    return (
        <Container>
            <Cross onClick={props.closeHandler} />
            <FormWrapper onSubmit={formik.handleSubmit}>
                <TwoInputsAndLabel label="Age" idFrom="ageFrom" idTo="ageTo" nameFrom="ageFrom" nameTo="ageTo" onChange={formik.handleChange} valueFrom={formik.values.ageFrom} valueTo={formik.values.ageTo} />
                {/* komunikat jesli walidacja sie nie powiedzie */}
                {formik.touched.ageFrom && formik.errors.ageFrom ? (
                    <div>{formik.errors.ageFrom}</div>
                ) : null}
                {formik.touched.ageTo && formik.errors.ageTo ? (
                    <div>{formik.errors.ageTo}</div>
                ) : null}
                <InputAndLabel label="District" id="district" name="district" onChange={formik.handleChange} value={formik.values.district} />
                <InputAndLabel label="Key features" id="features" name="features" onChange={formik.handleChange} value={formik.values.features} />
                <InputAndLabel label="Key customs" id="customs" name="customs" onChange={formik.handleChange} value={formik.values.customs} />
                <ButtonWrapper>
                    <SearchButton>Submit</SearchButton>
                </ButtonWrapper>
            </FormWrapper>
        </Container>
    )
}
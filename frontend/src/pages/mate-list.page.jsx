import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TwoInputsAndLabel } from '../components/two-inputs-and-label.component';
import { CheckboxAndLabel } from '../components/checkbox-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { SearchButton } from '../components/search-button.component';
import { MateCard } from '../components/mate-card.component';
import mate_landing from '../assets/images/mate_landing.jpg';

const Container = styled.div`
    width: 100%;

`

const FormWrapper = styled.form`
    width: 90%;
    margin: 50px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
` 


class MateListPage extends React.Component {

    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        ageFrom: 0,
                        ageTo: 100,
                        wakeFrom: 0,
                        wakeTo: 24,
                        bedFrom: 0,
                        bedTo: 24,
                        district: '',
                        features: '',
                        pets: false,
                        smoking: false,
                    }}

                    validationSchema={Yup.object({
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
                    })}

                    onSubmit={values => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {props => (
                        <FormWrapper onSubmit={props.handleSubmit}>
                            <TwoInputsAndLabel label="Age" idFrom="ageFrom" idTo="ageTo" nameFrom="ageFrom" nameTo="ageTo" onChange={props.handleChange} valueFrom={props.values.ageFrom} valueTo={props.values.ageTo} />
                            {/* komunikat jesli walidacja sie nie powiedzie */}
                            {props.touched.ageFrom && props.errors.ageFrom ? (
                                <div>{props.errors.ageFrom}</div>
                            ) : null}
                            {props.touched.ageTo && props.errors.ageTo ? (
                                <div>{props.errors.ageTo}</div>
                            ) : null}
                            <TwoInputsAndLabel label="Wakes up" idFrom="wakeFrom" idTo="wakeTo" nameFrom="wakeFrom" nameTo="wakeTo" onChange={props.handleChange} valueFrom={props.values.wakeFrom} valueTo={props.values.wakeTo} />
                            {props.touched.wakeFrom && props.errors.wakeFrom ? (
                                <div>{props.errors.wakeFrom}</div>
                            ) : null}
                            {props.touched.wakeTo && props.errors.wakeTo ? (
                                <div>{props.errors.wakeTo}</div>
                            ) : null}
                            <TwoInputsAndLabel label="Goes to bed" idFrom="bedFrom" idTo="bedTo" nameFrom="bedFrom" nameTo="bedTo" onChange={props.handleChange} valueFrom={props.values.bedFrom} valueTo={props.values.bedTo} />
                            {props.touched.bedFrom && props.errors.bedFrom ? (
                                <div>{props.errors.bedFrom}</div>
                            ) : null}
                            {props.touched.bedTo && props.errors.bedTo ? (
                                <div>{props.errors.bedTo}</div>
                            ) : null}
                            <SmallInputAndLabel label="District" id="district" name="district" onChange={props.handleChange} value={props.values.district} />
                            <CheckboxAndLabel label="Pets" id="pets" name="pets" onChange={props.handleChange} value={props.values.pets} />
                            <CheckboxAndLabel label="Smoking" id="smoking" name="smoking" onChange={props.handleChange} value={props.values.smoking} />
                            <SmallInputAndLabel label="Personal features" id="features" name="features" onChange={props.handleChange} value={props.values.features} />
                            
                            <SearchButton>Filter</SearchButton>
                        </FormWrapper>
                    )}
                </Formik>
                <MateCard src={mate_landing} title="Peaceful IT student" age="22" location="Krzyki" features="#peaceful #quiet #gaming #cycling"/>
                <MateCard src={mate_landing} title="Peaceful IT student" age="22" location="Krzyki" features="#peaceful #quiet #gaming #cycling"/>
                <MateCard src={mate_landing} title="Peaceful IT student" age="22" location="Krzyki" features="#peaceful #quiet #gaming #cycling"/>
                <MateCard src={mate_landing} title="Peaceful IT student" age="22" location="Krzyki" features="#peaceful #quiet #gaming #cycling"/>
            </Container>
        )
    }
}

export { MateListPage }
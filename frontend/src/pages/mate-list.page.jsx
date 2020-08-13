import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
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
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }


    componentDidMount() {
        const data = this.props.match.params;
        axios.get(`http://localhost:8000/search_mates/${data.ageFrom}/${data.ageTo}/${data.location ? data.location : ''}/${data.features ? data.features : ''}/${data.customs ? data.customs : ''}`).then(res => {
            this.setState({ data: res.data });
        })
    }

    render() {

        return (
            <Container>
                <Formik
                    initialValues={{
                        ageFrom: 0,
                        ageTo: 100,
                        district: '',
                        features: '',
                    }}

                    validationSchema={Yup.object({
                        ageFrom: Yup.number()
                            .min(0, 'Must be greater or equal 0')
                            .max(100, 'Must be less or equal 100'),
                        ageTo: Yup.number()
                            .min(0, 'Must be greater or equal 0')
                            .max(100, 'Must be less or equal 100'),
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
                            <SmallInputAndLabel label="District" id="district" name="district" onChange={props.handleChange} value={props.values.district} />
                            <SmallInputAndLabel label="Personal features" id="features" name="features" onChange={props.handleChange} value={props.values.features} />

                            <SearchButton>Filter</SearchButton>
                        </FormWrapper>
                    )}
                </Formik>

                {
                    this.state.data.map((element) => (
                        <MateCard src={element.image} title={element.title} age={element.age} location={element.location} features={element.features} />
                    ))
                }

            </Container>
        )
    }
}

export default withRouter(MateListPage)
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import FormData from 'form-data';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Formik } from "formik";
import { InputAndLabel } from '../components/input-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { SearchButton } from '../components/search-button.component';
import { FileInput } from '../components/file-input.component';
import { static_host } from '../assets/global-settings';

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

const Message = styled.span`
    display: block;
    margin-top: 10px;
    color: ${props => props.status === 'success' ? 'green' : 'red'};
    text-align: center;
`


class AddMatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], message: '', status: '' };
    }

    componentDidMount() {
        if (this.props.match.url.includes('edit')) {
            axios.get(`${static_host}/mate_offer_detail/${this.props.match.params.offerId}`).then(res => {
                if (res.status === 200) {
                    this.setState({ data: res.data });
                }
            })
        }
    }

    render() {
        const data = this.state.data;

        return (
            <Container>
                <Formik
                    // https://stackoverflow.com/questions/53920132/how-to-pass-state-values-to-initial-values-in-formik-in-react-js
                    enableReinitialize

                    // TODO warning
                    initialValues={{
                        title: data.title,
                        field_of_study: data.field_of_study,
                        age: data.age,
                        features: data.features,
                        customs: data.customs,
                        location: data.location,
                        phone: data.phone,
                        file: data.image,
                    }}

                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('cannot be empty'),
                        age: Yup.number()
                            .min(0, 'Must be greater or equal 0')
                            .required('cannot be empty'),
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

                        // TODO image in edit
                        // https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
                        let data = new FormData();
                        data.append('image', values.file, values.file.fileName);
                        data.append('title', values.title);
                        data.append('field_of_study', values.field_of_study);
                        data.append('age', values.age);
                        data.append('location', values.location);
                        data.append('features', values.features);
                        data.append('customs', values.customs);
                        data.append('phone', values.phone);

                        const headers = {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        }

                        if (this.props.match.url.includes('edit')) {
                            data.append('id', this.props.match.params.offerId)
                            axios.put(`${static_host}/user_mate_detail/`, data, { headers })
                                .then(res => {
                                    if (res.status === 200) {
                                        this.setState({ message: 'Offer edited', status: 'success' })
                                    }
                                }).catch(error => {
                                    const errors = error.response.data;
                                    let message = '';
                                    for (const type in errors) {
                                        message = message.concat(`${errors[type]}`)
                                    }
                                    message = message.replace(/,/g, '\n');
                                    this.setState({ message: message, status: 'fail' });
                                });
                        } else {
                            axios.post(`${static_host}/user_mate_detail/`, data, { headers })
                                .then(res => {
                                    if (res.status === 201) {
                                        this.setState({ message: 'New offer added', status: 'success' })
                                    }
                                }).catch(error => {
                                    const errors = error.response.data;
                                    let message = '';
                                    for (const type in errors) {
                                        message = message.concat(`${errors[type]}`)
                                    }
                                    message = message.replace(/,/g, '\n');
                                    this.setState({ message: message, status: 'fail' });
                                });
                        }

                    }}
                >
                    {props => (
                        <BigForm onSubmit={props.handleSubmit}>

                            <InputAndLabel label="Title" id="title" name="title" value={props.values.title} onChange={props.handleChange} />
                            {props.errors.title && <Feedback>{props.errors.title}</Feedback>}
                            <FileInput setFieldValue={props.setFieldValue} />

                            <SecondRow>
                                <div>
                                    <SmallInputAndLabel pos="left" label="Age" id="age" name="age" value={props.values.age} onChange={props.handleChange} />
                                    {props.errors.age && <Feedback>{props.errors.age}</Feedback>}
                                </div>
                                <div>

                                    <SmallInputAndLabel pos="left" label="Field of study" id="field_of_study" name="field_of_study" value={props.values.field_of_study} onChange={props.handleChange} />
                                    {props.errors.field_of_study && <Feedback>{props.errors.field_of_study}</Feedback>}
                                </div>
                                <div>
                                    <SmallInputAndLabel pos="left" label="Phone" id="phone" name="phone" value={props.values.phone} onChange={props.handleChange} />
                                    {props.errors.phone && <Feedback>{props.errors.phone}</Feedback>}
                                </div>
                                <div>
                                    <SmallInputAndLabel pos="left" label="Location" id="location" name="location" value={props.values.location} onChange={props.handleChange} />
                                    {props.errors.location && <Feedback>{props.errors.location}</Feedback>}
                                </div>
                            </SecondRow>

                            <div>
                                <InputAndLabel label="Personal features. Separtate with semicolon" id="features" name="features" value={props.values.features} onChange={props.handleChange} />
                                {props.errors.features && <Feedback>{props.errors.features}</Feedback>}
                            </div>

                            <div>
                                <InputAndLabel label="Customs. Separtate with semicolon" id="customs" name="customs" value={props.values.customs} onChange={props.handleChange} />
                                {props.errors.customs && <Feedback>{props.errors.customs}</Feedback>}
                            </div>

                            <ButtonWrapper>
                                <SearchButton>Submit</SearchButton>
                            </ButtonWrapper>
                            <Message status={this.state.status}>
                                {this.state.message}
                            </Message>
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

export default withRouter(AddMatePage)
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


class AddRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], status: '', message: '' };
    }

    componentDidMount() {
        if (this.props.match.url.includes('edit')) {
            axios.get(`http://localhost:8000/room_offer_detail/${this.props.match.params.offerId}`).then(res => {
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
                    // enableReinitialize

                    // TODO warning
                    initialValues={{
                        title: data.title,
                        price: data.price,
                        area: data.area,
                        location: data.location,
                        number_of_flatmates: data.number_of_flatmates,
                        building_features: data.building_features,
                        flat_features: data.flat_features,
                        flatmates_features: data.flatmates_features,
                        rules: data.rules,
                        phone: data.phone,
                    }}

                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('cannot be empty'),
                        price: Yup.number()
                            .min(0, 'must be greater or equal than 0')
                            .required('cannot be empty'),
                        area: Yup.number()
                            .min(0, 'must be greater or equal than 0')
                            .required('cannot be empty'),
                        location: Yup.string()
                            .required('cannot be empty'),
                        number_of_flatmates: Yup.number()
                            .min(0, 'must be greater or equal than 0')
                            .required('cannot be empty'),
                        building_features: Yup.string()
                            .required('cannot be empty'),
                        flat_features: Yup.string()
                            .required('cannot be empty'),
                        flatmates_features: Yup.string()
                            .required('cannot be empty'),
                        rules: Yup.string()
                            .required('cannot be empty'),
                        phone: Yup.string()
                            .required('cannot be empty'),
                    })}

                    onSubmit={values => {
                        let data = new FormData();
                        for (let i = 0; i < values.file.length; i++) {
                            data.append('photos', values.file[i]);
                        }
                        data.append('title', values.title);
                        data.append('price', values.price);
                        data.append('area', values.area);
                        data.append('location', values.location);
                        data.append('number_of_flatmates', values.number_of_flatmates);
                        data.append('building_features', values.building_features);
                        data.append('flat_features', values.flat_features);
                        data.append('flatmates_features', values.flatmates_features);
                        data.append('rules', values.rules);
                        data.append('phone', values.phone);

                        const headers = {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        }

                        if (this.props.match.url.includes('edit')) {
                            data.append('id', this.props.match.params.offerId)
                            axios.put('http://localhost:8000/user_room_detail/', data, { headers })
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
                            axios.post('http://localhost:8000/user_room_detail/', data, { headers })
                                .then(res => {
                                    if (res.status === 201) {
                                        this.setState({ message: "New offer added", status: 'success' })
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
                            <FileInput setFieldValue={props.setFieldValue} multiple={true} />

                            <SecondRow>
                                <div>
                                    <SmallInputAndLabel pos="left" type="number" label="Area" id="area" name="area" value={props.values.area} onChange={props.handleChange} />
                                    {props.errors.area && <Feedback>{props.errors.area}</Feedback>}
                                </div>

                                <div>
                                    <SmallInputAndLabel pos="left" type="number" label="Price" id="price" name="price" value={props.values.price} onChange={props.handleChange} />
                                    {props.errors.price && <Feedback>{props.errors.price}</Feedback>}
                                </div>

                                <div>
                                    <SmallInputAndLabel pos="left" label="Location" id="location" name="location" value={props.values.location} onChange={props.handleChange} />
                                    {props.errors.location && <Feedback>{props.errors.location}</Feedback>}
                                </div>

                                <div>
                                    <SmallInputAndLabel pos="left" type="number" label="Number of flatmates" id="number_of_flatmates" name="number_of_flatmates" value={props.values.number_of_flatmates} onChange={props.handleChange} />
                                    {props.errors.number_of_flatmates && <Feedback>{props.errors.number_of_flatmates}</Feedback>}
                                </div>

                                <div>
                                    <SmallInputAndLabel pos="left" label="Phone" id="phone" name="phone" value={props.values.phone} onChange={props.handleChange} />
                                    {props.errors.phone && <Feedback>{props.errors.phone}</Feedback>}
                                </div>
                            </SecondRow>


                            <div>
                                <InputAndLabel label="Building features. Separtate with semicolon" id="building_features" name="building_features" value={props.values.building_features} onChange={props.handleChange} />
                                {props.errors.building_features && <Feedback>{props.errors.building_features}</Feedback>}
                            </div>

                            <div>
                                <InputAndLabel label="Flat Features. Separtate with semicolon" id="flat_features" name="flat_features" value={props.values.flat_features} onChange={props.handleChange} />
                                {props.errors.flat_features && <Feedback>{props.errors.flat_features}</Feedback>}
                            </div>

                            <div>
                                <InputAndLabel label="Flatmates Features. Separtate with semicolon" id="flatmates_features" name="flatmates_features" value={props.values.flatmates_features} onChange={props.handleChange} />
                                {props.errors.flatmates_features && <Feedback>{props.errors.flatmates_features}</Feedback>}
                            </div>

                            <div>
                                <InputAndLabel label="Rules. Separtate with semicolon" id="rules" name="rules" value={props.values.rules} onChange={props.handleChange} />
                                {props.errors.rules && <Feedback>{props.errors.rules}</Feedback>}
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

            </Container>
        )
    }

}

export default withRouter(AddRoomPage)
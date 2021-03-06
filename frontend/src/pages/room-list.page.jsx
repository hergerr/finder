import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import * as queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { TwoInputsAndLabel } from '../components/two-inputs-and-label.component';
import { SmallInputAndLabel } from '../components/small-input-and-label';
import { SearchButton } from '../components/search-button.component';
import { RoomCard } from '../components/room-card.component';
import { static_host } from '../assets/global-settings';

const Container = styled.div`
    width: 100%;
`

const FormWrapper = styled.form`
    width: 70%;
    margin-bottom: 50px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    button {
        align-self:flex-end;
    }
`

const Feedback = styled.div`
    color: red;
`

const Row = styled.div`
    display: flex;
`

const Break = styled.div`
    width: 10%;
`


class RoomListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], favIds: [] };
    }


    handleLoad = () => {
        const data = queryString.parse(this.props.history.location.search);
        const url = `${static_host}/search_rooms/?priceFrom=${data.priceFrom}&priceTo=${data.priceTo}` +
            `&roomAreaFrom=${data.roomAreaFrom}&roomAreaTo=${data.roomAreaTo}&location=${data.location ? data.location : ''}` +
            `&numberOfFlatmates=${data.numberOfFlatmates ? data.numberOfFlatmates : ''}` +
            `&buildingFeatures=${data.buildingFeatures ? data.buildingFeatures : ''}` +
            `&flatFeatures=${data.flatFeatures ? data.flatFeatures : ''}` +
            `&flatmatesFeatures=${data.flatmatesFeatures ? data.flatmatesFeatures : ''}` +
            `&rules=${data.rules ? data.rules : ''}`
        axios.get(url).then(res => {
            this.setState({ data: res.data });
        })

        if (localStorage.getItem('access')) {

            axios.get(`${static_host}/get_liked_room_offers/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }
            ).then(res => {
                if (res.status === 200) {
                    let favIds = res.data.map((element) => (element.id))
                    this.setState({ favIds: favIds });
                }
            })
        }
    }

    componentDidMount() {
        this.handleLoad();
    }

    render() {

        return (
            <Container>
                <Formik
                    initialValues={{
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
                    }}

                    validationSchema={Yup.object({
                        priceFrom: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        priceTo: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        roomAreaFrom: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                        roomAreaTo: Yup.number()
                            .min(0, 'Must be greater or equal 0'),
                    })}

                    onSubmit={values => {
                        const url = `/room/list/?priceFrom=${values.priceFrom}&priceTo=${values.priceTo}` +
                            `&roomAreaFrom=${values.roomAreaFrom}&roomAreaTo=${values.roomAreaTo}` +
                            `&location=${values.location ? values.location : ''}` +
                            `&numberOfFlatmates=${values.number_of_flatmates ? values.number_of_flatmates : ''}` +
                            `&buildingFeatures=${values.building_features ? values.building_features : ''}` +
                            `&flatmatesFeatures=${values.flatmates_features ? values.flatmates_features : ''}` +
                            `&flatFeatures=${values.flat_features ? values.flat_features : ''}` +
                            `&rules=${values.rules ? values.rules : ''}`
                        this.props.history.push(url);
                        this.handleLoad();
                    }}
                >
                    {props => (

                        <FormWrapper onSubmit={props.handleSubmit}>
                            <Row>

                                <div>

                                    <TwoInputsAndLabel label="Price" idFrom="priceFrom" idTo="priceTo" nameFrom="priceFrom" nameTo="priceTo" onChange={props.handleChange} valueFrom={props.values.priceFrom} valueTo={props.values.priceTo} />
                                    {props.touched.priceFrom && props.errors.priceFrom ? (
                                        <Feedback>{props.errors.priceFrom}</Feedback>
                                    ) : null}
                                    {props.touched.priceTo && props.errors.priceTo ? (
                                        <Feedback>{props.errors.priceTo}</Feedback>
                                    ) : null}
                                </div>
                                <Break/>
                                <div>

                                    <TwoInputsAndLabel label="Room area" idFrom="roomAreaFrom" idTo="roomAreaTo" nameFrom="roomAreaFrom" nameTo="roomAreaTo" onChange={props.handleChange} valueFrom={props.values.roomAreaFrom} valueTo={props.values.roomAreaTo} />
                                    {props.touched.roomAreaFrom && props.errors.roomAreaFrom ? (
                                        <Feedback>{props.errors.roomAreaFrom}</Feedback>
                                    ) : null}
                                    {props.touched.roomAreaTo && props.errors.roomAreaTo ? (
                                        <Feedback>{props.errors.roomAreaTo}</Feedback>
                                    ) : null}
                                </div>
                            </Row>
                            <Row>
                                <SmallInputAndLabel label="Location" id="location" name="location" onChange={props.handleChange} value={props.values.location} />
                                <Break/>
                                <SmallInputAndLabel type="number" label="Number of flatmates" id="number_of_flatmates" name="number_of_flatmates" onChange={props.handleChange} value={props.values.number_of_flatmates} />
                                <Break/>
                                <SmallInputAndLabel label="Building Features" id="building_features" name="building_features" onChange={props.handleChange} value={props.values.building_features} />
                            </Row>

                            <Row>
                                <SmallInputAndLabel label="Flat Features" id="flat_features" name="flat_features" onChange={props.handleChange} value={props.values.flat_features} />
                                <Break/>
                                <SmallInputAndLabel label="Flatmates Features" id="flatmates_features" name="flatmates_features" onChange={props.handleChange} value={props.values.flatmates_features} />
                                <Break/>
                                <SmallInputAndLabel label="Rules" id="rules" name="rules" onChange={props.handleChange} value={props.values.rules} />
                            </Row>

                            <SearchButton>Filter</SearchButton>
                        </FormWrapper>
                    )}
                </Formik>

                {
                    this.state.data ? this.state.data.map((element) => {
                        if (this.state.favIds.includes(element.id))
                            return <RoomCard liked={true} src={element.photos[0].image} key={element.id} id={element.id} title={element.title} area={element.area} location={element.location} price={element.price} numberOfFlatmates={element.number_of_flatmates} />
                        else
                            return <RoomCard liked={false} src={element.photos[0].image} key={element.id} id={element.id} title={element.title} area={element.area} location={element.location} price={element.price} numberOfFlatmates={element.number_of_flatmates} />
                    }) : ''
                }

            </Container>
        )
    }
}

export default withRouter(RoomListPage)
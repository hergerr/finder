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
import { MateCard } from '../components/mate-card.component';
import { static_host } from '../assets/global-settings';

const Container = styled.div`
    width: 100%;
`

const FormWrapper = styled.form`
    width: 70%;
    margin-bottom: 50px;
    margin: 50px auto;
    display: flex;
    justify-content: flex-start;

    button {
        align-self:flex-end;
    }
`

const Feedback = styled.div`
    color: red;
`

class MateListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], favIds: [] };
    }


    handleLoad = () => {
        const data = queryString.parse(this.props.history.location.search);
        const url = `${static_host}/search_mates/?ageFrom=${data.ageFrom}&ageTo=${data.ageTo}&district=${data.district}&features=${data.features}&customs=${data.customs}`
        axios.get(url).then(res => {
            this.setState({ data: res.data });
        })

        if (localStorage.getItem('access')) {

            axios.get(`${static_host}/get_liked_mate_offers/`, {
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
                        ageFrom: 0,
                        ageTo: 100,
                        district: '',
                        features: '',
                        customs: '',
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
                        const url = `/mate/list/?ageFrom=${values.ageFrom}&ageTo=${values.ageTo}&district=${values.district ? values.district : ''}&features=${values.features ? values.features : ''}&customs=${values.customs ? values.customs : ''}`
                        this.props.history.push(url);
                        this.handleLoad();
                    }}
                >
                    {props => (
                        <FormWrapper onSubmit={props.handleSubmit}>
                            <div>
                                <TwoInputsAndLabel label="Age" idFrom="ageFrom" idTo="ageTo" nameFrom="ageFrom" nameTo="ageTo" onChange={props.handleChange} valueFrom={props.values.ageFrom} valueTo={props.values.ageTo} />
                                {/* komunikat jesli walidacja sie nie powiedzie */}
                                {props.touched.ageFrom && props.errors.ageFrom ? (
                                    <Feedback>{props.errors.ageFrom}</Feedback>
                                ) : null}
                                {props.touched.ageTo && props.errors.ageTo ? (
                                    <Feedback>{props.errors.ageTo}</Feedback>
                                ) : null}
                            </div>

                            <SmallInputAndLabel label="District" id="district" name="district" onChange={props.handleChange} value={props.values.district} />
                            <SmallInputAndLabel label="Personal features" id="features" name="features" onChange={props.handleChange} value={props.values.features} />
                            <SmallInputAndLabel label="Personal customs" id="customs" name="customs" onChange={props.handleChange} value={props.values.customs} />

                            <SearchButton>Filter</SearchButton>
                        </FormWrapper>
                    )}
                </Formik>

                {
                    this.state.data.map((element) => {
                        if (this.state.favIds.includes(element.id))
                            return <MateCard liked={true} key={element.id} id={element.id} src={element.image} title={element.title} age={element.age} location={element.location} features={element.features} customs={element.customs} />
                        else
                            return <MateCard liked={false} key={element.id} id={element.id} src={element.image} title={element.title} age={element.age} location={element.location} features={element.features} customs={element.customs} />
                    })
                }

            </Container>
        )
    }
}

export default withRouter(MateListPage)
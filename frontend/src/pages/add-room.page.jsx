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

const ThirdRow = styled.div`
`

const ForthRow = styled.div`
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


class AddRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
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
                    enableReinitialize

                    // TODO warning
                    initialValues={{
                        title: data.title,
                    }}

                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('cannot be empty'),
                    })}

                    onSubmit={values => {
                        let data = new FormData();
                        data.append('image', values.file, values.file.fileName);
                        data.append('title', values.title);


                        const headers = {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        }

                        if (this.props.match.url.includes('edit')) {
                            data.append('id', this.props.match.params.offerId)
                            axios.put('http://localhost:8000/user_room_detail/', data, { headers });
                        } else {
                            axios.post('http://localhost:8000/user_room_detail/', data, { headers });
                        }

                    }}
                >
                    {props => (
                        <BigForm onSubmit={props.handleSubmit}>

                            <InputAndLabel label="Title" id="title" name="title" value={props.values.title} onChange={props.handleChange} />
                            {props.errors.title && <Feedback>{props.errors.title}</Feedback>}

                            <ButtonWrapper>
                                <SearchButton>Submit</SearchButton>
                            </ButtonWrapper>
                        </BigForm>
                    )}
                </Formik>

            </Container>
        )
    }

}

export default withRouter(AddRoomPage)
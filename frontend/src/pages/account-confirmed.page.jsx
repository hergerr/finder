import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { static_host } from '../assets/global-settings';

const Container = styled.div`
    width: 100%;
    margin-top: 200px;

    p {
        font-size: 30px;
        text-align: center;
        color: var(--color-orange)
    }
`

class AccountConfirmedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "loading..." }
    }


    componentDidMount() {
        const data = queryString.parse(this.props.history.location.search);

        axios.post(`${static_host}/accounts/verify-registration/`, { user_id: data.user_id, timestamp: data.timestamp, signature: data.signature }, {
        }).then(res => {
            if (res.status === 200) {
                this.setState({ message: "Congratulations, you activated your account. Now you can log in" })
            }
        })
    }

    render() {
        return (
            <Container>
                <p>
                    {this.state.message}
                </p>
            </Container>

        )
    }
}

export default withRouter(AccountConfirmedPage);
import React from 'react';
// import styled from 'styled-components';
import axios from 'axios';
import * as queryString from 'query-string';
import { withRouter } from 'react-router-dom';

class AccountConfirmedPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {message: "loadding..."}
    }


    componentDidMount() {
        const data = queryString.parse(this.props.history.location.search);

        axios.post('http://localhost:8000/accounts/verify-registration/', { user_id: data.user_id, timestamp: data.timestamp, signature: data.signature }, {
        }).then(res => {
                if (res.status === 200) {
                    this.setState({message: "Congratulations, you confirmed your accoutn. Now you can log in"})
                }
            })
    }

    render() {
        return (
            <p>
                {this.state.message}
            </p>
        )
    }
}

export default withRouter(AccountConfirmedPage);
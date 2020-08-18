import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { SearchButton } from '../components/search-button.component';
import { ChatMessage } from '../components/chat-message.component';

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 60px;
`

const Title = styled.h3`
    font-size: 25px;
    font-weight: lighter;
    margin-bottom: 20px;
`

const Window = styled.div`
    height: 500px;
    overflow: auto;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
`

const FormWrapper = styled.form`
    display: flex;
    margin-top: 10px;
    width: 80%;
`

const MessageInput = styled.textarea`
    width: 80%;
    height: 50px;
    margin-right: 30px;
`

class ConversationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, id: 'x' };
    }


    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        };

        axios.get(`http://localhost:8000/get_conversation/${this.props.match.params.conversationId}`,
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ data: res.data });
            }
        })

        axios.get('http://localhost:8000/get_user_id/',
            config).then(res => {
                if (res.status === 200) {
                    this.setState({ id: res.data });
                }
            })

        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    // https://stackoverflow.com/a/45905418
    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }


    render() {
        const data = this.state.data;

        return (
            <Container>

                <Title>Conversation with {data.members ? data.members[1].email : ''} - <b>{data.subject}</b> </Title>
                <Window>

                    {
                        data.message ? data.message.map(element => {
                            if (element.owner === this.state.id)
                                return <ChatMessage type="send" key={element.datetime} content={element.content} />
                            else {
                                return <ChatMessage type="receive" key={element.datetime} content={element.content} />
                            }
                        }) : null
                    }
                    <div ref={el => { this.el = el; }} />
                </Window>
                <Formik
                    initialValues={{
                        message: '',
                    }}

                    validationSchema={Yup.object({
                        message: Yup.string()
                            .required('cannot be empty'),
                    })}

                    onSubmit={values => {
                        axios.post(`http://localhost:8000/send_message_conv_id/`, { content: values.message, id: this.state.data.id }, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
                        }).then(res => {
                            if (res.status === 200) {
                                this.setState({ data: res.data })
                            }
                        })
                    }}>


                    {props => (
                        <FormWrapper onSubmit={props.handleSubmit}>
                            <MessageInput label="message" name="message" id="message" onChange={props.handleChange} value={props.values.message} />
                            {props.errors.message}
                            <SearchButton>Send</SearchButton>
                        </FormWrapper>
                    )}
                </Formik>

            </Container>
        )
    }

}

export default withRouter(ConversationPage)
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SearchButton } from '../components/search-button.component';

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
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
`

const ReceivedMessage = styled.div`
    width: 400px;
    margin: 60px;
    border: 1px solid black;
    border-radius: 5px;

    p {
        padding: 10px;
    }
`

const SendMessage = styled.div`
    width: 400px;
    margin: 60px;
    margin-left: auto;
    border: 1px solid var(--color-orange);
    border-radius: 5px;

    p {
        padding: 10px;
    }
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
    }

    render() {
        return (
            <Container>

                <Title>Conversation with nad@mail.ru</Title>
                <Window>
                    <ReceivedMessage>
                        <p>
                            Hello, what is actual price?
                        </p>
                    </ReceivedMessage>
                    
                    <SendMessage>
                        <p>
                        1100PLN, but you need to take into account costs like parking, bike parking, cleaning costs, an so on...
                        </p>
                    </SendMessage>

                    <ReceivedMessage>
                        <p>
                            Ok. Thanks, I will consider.
                        </p>
                    </ReceivedMessage>
                </Window>
                <FormWrapper>
                    <Formik
                        initialValues={{
                            message: 0
                        }}

                        validationSchema={Yup.object({
                            message: Yup.string()
                                .min(0, 'field cannot be empty')
                        })}

                        onSubmit={values => {
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >


                        {props => (
                            <FormWrapper onSubmit={props.handleSubmit}>
                                <MessageInput />
                                <SearchButton>Send</SearchButton>
                            </FormWrapper>
                        )}
                    </Formik>

                </FormWrapper>
            </Container>
        )
    }

}

export { ConversationPage }
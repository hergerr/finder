import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 80%;
    margin: 20px 90px;;
    background-color: white;
    display: flex;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px 0;
`

const FromSection = styled.div`
    margin-left: 30px;
    display: flex;
    flex-direction: column;
`

const ToSection = styled.div`
    margin-left: 230px;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    color: var(--color-orange);
    font-size: 10px;
`

const Email = styled.h6`
    margin-top: 20px;
    font-size: 24px;
`

const Subject = styled.h6`
    margin-top: 10px;
    font-size: 24px; 
`

const LastMessage = styled.p`
    font-size: 10px;
    margin-top: 5px;
`


export const MessageCard = (props) => {

    return (
        <Container>
            <FromSection>
                <Title>from</Title>
                <Email>{props.email}</Email>
            </FromSection>

            <ToSection>
                <Title>message</Title>
                <Subject>{props.subject}</Subject>
                <LastMessage>{props.last_message}</LastMessage>
            </ToSection>
        </Container>

    )
}
import React from 'react';
import styled from 'styled-components';


const Message = styled.div`
width: 400px;
margin: 60px;
margin-left: ${props => props.type === "send" ? "60px" : "auto"};
border: 1px solid ${props => props.type === "send" ? "var(--color-orange)" : "black"} ;
border-radius: 5px;

p {
    padding: 10px;
}
`

export const ChatMessage = (props) => {
    return (
        <Message type={props.type}>
            <p>
                {props.content}
            </p>
        </Message>
    )

}
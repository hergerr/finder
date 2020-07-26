import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
    background-color: var(--color-dark-grey);
    padding: 10px 20px;
    font-weight: lighter;
    font-size: 20px;
    border-radius: 5px;
`

export const AddButton = (props) => (
    <Container onClick={props.onClick}>
        {props.content}
    </Container>
)
import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
    background-color: white;
    padding: 7px 16px;
    border: 1px solid var(--color-orange);
    border-radius: 8px;
    margin: 10px;
`

export const FeatureBox = (props) => (
    <Container onClick={props.onClick}>
        {props.content}
    </Container>
)
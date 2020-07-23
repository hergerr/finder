import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`

const Label = styled.div`
    font-size: 15px;
    margin-top: 20px;
`

const Input = styled.input`
    display: block;
    width: 100%;
`


export const InputAndLabel = (props) => (
    <Container>
        <Label>{props.label}</Label>
        <Input type={props.type} id={props.id} onChange={props.onChange} value={props.value}></Input>
    </Container>
)
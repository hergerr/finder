import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`

const Label = styled.div`
    font-size: 10px;
    margin: 10px 0;
`

const Input = styled.input`
    display: block;
    width: 100%;
    border-radius: 5px;
    padding: 10px 0;
    border: 1px solid black;
`


export const InputAndLabel = (props) => (
    <Container>
        <Label>{props.label}</Label>
        <Input type={props.type} id={props.id} onChange={props.onChange} value={props.value}></Input>
    </Container>
)
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0 auto;
`

const Label = styled.div`
    margin: 10px 0;
    font-size: 10px;

`

const Input = styled.input`
    width: 200px;
    display: block;
    font-size: 14px;
    border-radius: 5px;
    padding: 10px 0;
    border: 1px solid black;
`

export const SmallInputAndLabel = (props) => (
    <Container>
        <Label>{props.label}</Label>
        <Input type={props.type} id={props.id} onChange={props.onChange} value={props.value}></Input>
    </Container>
)
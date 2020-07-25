import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0 auto;
`

const Label = styled.div`
    margin: 10px 0;
    font-size: 10px;
`

const SmallLabel = styled.label`
    font-size: 20px;
`

const Input = styled.input`
    font-size: 14px;
    margin: 0 10px;
    width: 90px;
    border-radius: 5px;
    padding: 10px 0;
    border: 1px solid black;
`


export const TwoInputsAndLabel = (props) => (
    <Container>
        <Label>{props.label}</Label>
        <SmallLabel>from</SmallLabel><Input type="number" id={props.idFrom} name={props.nameFrom} onChange={props.onChange} value={props.valueFrom}/>
        <SmallLabel>to</SmallLabel><Input type="number" id={props.idTo} name={props.nameTo} onChange={props.onChange} value={props.valueTo} />
    </Container>
)
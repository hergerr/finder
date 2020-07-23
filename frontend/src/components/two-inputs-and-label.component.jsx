import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: white;
    margin: 0 auto;
`

const Label = styled.div`
    width: 100px;
    margin: 10px 0;
`

const SmallLabel = styled.label`
    font-size: 15px;
`

const Input = styled.input`
    font-size: 10px;
    margin: 0 10px;
    width: 90px;
`


export const TwoInputsAndLabel = (props) => (
    <Container>
        <Label>{props.label}</Label>
        <SmallLabel>from</SmallLabel><Input id={props.idFrom} name={props.nameFrom} onChange={props.onChange} value={props.valueFrom}/>
        <SmallLabel>to</SmallLabel><Input id={props.idTo} name={props.nameTo} onChange={props.onChange} value={props.valueTo} />
    </Container>
)
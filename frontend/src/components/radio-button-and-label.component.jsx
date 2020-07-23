import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    background-color: white;
`
const Label = styled.div`
    font-size: 15px;
`

const Input = styled.input`
`

export const RadioButtonAndLabel = (props) => (
    <Container>
        <Label>{ props.label }</Label>
        <Input type="radio" id="pets" name="pets" onChange={props.onChange} value={props.value}></Input>
    </Container>

)
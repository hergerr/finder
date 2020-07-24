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

export const CheckboxAndLabel = (props) => (
    <Container>
        <Label>{ props.label }</Label>
        <Input type="checkbox" id={props.id} name={props.name} onChange={props.onChange}/>
    </Container>

)
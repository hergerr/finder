import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    margin: 0 auto;
`
const Label = styled.div`
    margin: 10px 0;
    font-size: 10px;
`

const Input = styled.input`
`

export const CheckboxAndLabel = (props) => (
    <Container>
        <Label>{ props.label }</Label>
        <Input type="checkbox" id={props.id} name={props.name} onChange={props.onChange}/>
    </Container>

)
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

const Label = styled.div`
    margin: 10px 0;
    font-size: 10px;
`


export const FileInput = (props) => (
    <Container>
        <Label>Photo</Label>
        <input id="file" name="file" type="file" onChange={(event) => {
            props.setFieldValue("file", event.currentTarget.files[0]);
        }} />
    </Container>
)
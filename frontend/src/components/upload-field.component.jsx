import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
    width: 70px;
    height: 70px;
    background-color: var("--color-dark-grey");
    border-radius: 5px;
`
const FileInput = styled.input`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`

const FileLabel = styled.label`
    display:block;
    width: 100px;
    height: 100px;
    background-color: black;
    font-size: 30px;
    color: white;
    text-align:center;
    cursor: pointer;

    * {
        display: flex;
        align-self: center;
    }
`

export const UploadField = (props) => {
    let $imagePreview = null;

    return (


        <Container onSubmit={props.handleSubmit}>
            <FileInput type="file" name="file" id="file" onChange={props.handleImageChange} />
            <FileLabel htmlFor="file">+</FileLabel>
            {!$imagePreview && <img src={props.imagePreviewUrl} />}
        </Container>
    )
}
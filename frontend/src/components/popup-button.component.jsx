import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 30px;
    border: 1px solid black;
    background-color: white;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
`


export const PopupButton = (props) => (
    <Button>{props.content}</Button>
)
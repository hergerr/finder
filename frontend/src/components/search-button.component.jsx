import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
    color: white;
    font-size: 15px;
    border-radius: 10px;
    padding: 8px 20px;
    background-color: var(--color-orange);
    border:none;
    cursor: pointer;
`

export const SearchButton = (props) => (
    <Button type="submit">{props.children}</Button>
)
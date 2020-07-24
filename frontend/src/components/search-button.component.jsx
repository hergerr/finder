import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
    color: var(--color-text);
    color: white;
    font-size: 15px;
    border-radius: 10px;
    padding: 4px 10px;
    background-color: var(--color-orange);
    border:none;
    cursor: pointer;
`

export const SearchButton = (props) => (
    <Button type="submit">{props.children}</Button>
)
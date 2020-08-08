import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    width: 100%;
    padding: 30px 0;
    display: flex;
`

const Title = styled.h6`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
    font-size: 30px;
    width: 50%;
    text-align: center;
`

const Features = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 19px;

    ul {
        li {
            font-weight: 300;
            list-style: none;
            line-height: 40px;
        }
    }
`

export const WhiteBorder = styled.div`
    background-color: white;
    width: 100%;
    height: 5px;
`

export const DetailBlock = (props) => (
    <Container>
        <Title>{props.title}</Title>

        <Features>
            <ul>
                {
                    props.features.map(
                        (element, index) => (
                            <li key={index}>{element}</li>
                        )
                    )
                }
            </ul>
        </Features>
    </Container>
)
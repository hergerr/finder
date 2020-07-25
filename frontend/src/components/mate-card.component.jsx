import React from 'react'
import styled from 'styled-components';
import { HeartOutline } from '@styled-icons/evaicons-outline';

const Container = styled.div`
    background-color: white;
    width: 70%;
    height: 250px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 40px auto;
    display: flex;
`

const Image = styled.img `
    width: 240px;
    margin: 20px;
    object-fit: cover;
`

const Description = styled.div`
    display: flex;
    margin: 40px 40px;
    flex-direction: column;
`

const Title = styled.h6`
    font-weight: 700;
    font-size: 24px;
`

const Detail = styled.p`
    margin: 10px 0;
    font-weight: 200;
    font-size: 20px;
`

const Heart = styled(HeartOutline)`
    width: 40px;
    margin-left: 550px;
`


export const MateCard = (props) => {

    return (
        <Container>
            <Image src={props.src}/>
            <Description>
                <Title>{props.title}</Title>
                <Detail>{props.age}</Detail>
                <Detail>{props.location}</Detail>
                <Detail>{props.features}</Detail>                
            </Description>
            <Heart/>
        </Container>
    )
}
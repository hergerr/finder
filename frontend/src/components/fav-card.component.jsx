import React from 'react';
import styled from 'styled-components';
import { StyledTrash } from './account-utils.component';
import room_landing from '../assets/images/room_landing.jpg'

const Container = styled.div`
    width: 80%;
    margin: 20px 90px;;
    background-color: white;
    display: flex;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px 0;
    align-items: center;
`

const Image = styled.img`
    height: 100px;
    margin: 0 30px; 
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    font-weight: bold;
    font-size: 20px;
`

const TextContent = styled.p`
    font-weight: lighter;
    font-size: 14px;
`

const IconWrapper = styled.div`
    margin-left: auto;
`

export const FavCard = (props) => {

    return (
        <Container>
            <Image src={room_landing} />
            <TextWrapper>
                <Title>Spacious room in city center</Title>
                <TextContent>Dominicain square</TextContent>
                <TextContent>13 m2</TextContent>
                <TextContent>2 flatmates</TextContent>
            </TextWrapper>

            <IconWrapper>
                <StyledTrash/>    
            </IconWrapper>

        </Container>
    )
}
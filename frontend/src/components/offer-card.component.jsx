import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { StyledTrash, StyledEdit } from './account-utils.component';
import { static_host } from '../assets/global-settings';

const Container = styled.div`
    width: 80%;
    margin: 20px 90px;;
    background-color: white;
    display: flex;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px 0;
    align-items: center;

    a {
        color: black;
        text-decoration: none;
        display: flex;
    }
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
    margin-top: 5px;
    font-weight: lighter;
    font-size: 14px;
`

const IconWrapper = styled.div`
    margin-left: auto;
`

export const OfferCard = (props) => {

    let history = useHistory();

    let content;
    if (props.type === 'room') {
        content = <TextWrapper>
            <Title>{props.title}</Title>
            <TextContent>{props.location}</TextContent>
            <TextContent>{props.area}m2</TextContent>
            <TextContent>{props.flatmates} flatmate(s)</TextContent>
        </TextWrapper>
    } else if (props.type === 'mate') {
        content = <TextWrapper>
            <Title>{props.title}</Title>
            <TextContent>{props.age}</TextContent>
            <TextContent>{props.location}</TextContent>
            <TextContent>#{props.features.replace(/;/g, ' #')}</TextContent>
        </TextWrapper>
    }

    return (
        <Container>

            <Link to={props.link_to} >
                <Image src={`${static_host}${props.image}`} />
                {content}
            </Link>

            <IconWrapper>
                <StyledEdit onClick={e=>{
                    history.push(`/edit/mates/${props.id}`)
                }}/>
                <StyledTrash onClick={e => {
                    props.handleDelete(props.type, props.id)
                }} />
            </IconWrapper>

        </Container>
    )
}
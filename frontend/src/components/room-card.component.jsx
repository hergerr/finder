import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { HeartOutline } from '@styled-icons/evaicons-outline';
import { Heart } from '@styled-icons/evaicons-solid';
import { static_host } from '../assets/global-settings';


const Container = styled.div`
    background-color: white;
    width: 70%;
    height: 250px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 40px auto;
    display: flex;
`

const Image = styled.img`
    width: 240px;
    margin: 20px;
    object-fit: cover;
    cursor: pointer;
`

const Description = styled.div`
    display: flex;
    margin: 40px 40px;
    flex-direction: column;
`

const Title = styled.h6`
    font-weight: 700;
    font-size: 24px;
    cursor: pointer;
`

const Detail = styled.p`
    margin: 10px 0;
    font-weight: 200;
    font-size: 20px;
`

const RightSide = styled.div`
    margin-left: auto;
    margin-right: 30px;
    margin-top: 30px;
`

const Price = styled.p`
    display: block;
    color: var(--color-orange);
    font-size: 24px;
    margin-bottom: 40px;
`

const EmptyHeart = styled(HeartOutline)`
    width: 40px;
    cursor: pointer;
    float: right;
`

const FilledHeart = styled(Heart)`
    width: 40px;
    cursor: pointer;
    float: right;
`

export const RoomCard = (props) => {
    let history = useHistory();
    let likeProp = props.liked;

    const [liked, setLiked] = useState(likeProp);

    useEffect(() => {
        setLiked(likeProp)
    }, [likeProp])

    const handleChange = event => {
        if (!liked && localStorage.getItem('access')) {
            axios.post(`${static_host}/add_room_offer_to_liked/`, { id: props.id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
            }).then(res => {
                if (res.status === 200) {
                    setLiked(!liked);
                }
            })
        }
        else if (liked && localStorage.getItem('access')) {
            axios.delete(`${static_host}/delete_liked_room_offer/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                },
                data: {
                    id: props.id
                }
            }
            ).then(res => {
                if (res.status === 200) {
                    setLiked(!liked);
                }
            })
        }
    }

    const handleRedirect = event => {
        history.push(`/rooms/${props.id}`)
    }

    let heart = null;
    if (liked) {
        heart = <FilledHeart onClick={handleChange} />
    } else {
        heart = <EmptyHeart onClick={handleChange} />
    }

    return (
        <Container>
            <Image src={`${static_host}${props.src}`} onClick={handleRedirect} />
            <Description>
                <Title onClick={handleRedirect}>{props.title}</Title>
                <Detail>{props.location}</Detail>
                <Detail>{props.area} m2</Detail>
                <Detail>{props.numberOfFlatmates} flatmate(s)</Detail>
            </Description>
            <RightSide>
                <Price>{props.price}zł/month</Price>
                {heart}
            </RightSide>

        </Container>
    )
}
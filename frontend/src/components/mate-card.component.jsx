import React, {useState} from 'react'
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { HeartOutline } from '@styled-icons/evaicons-outline';
import { Heart } from '@styled-icons/evaicons-solid';


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

const EmptyHeart = styled(HeartOutline)`
    width: 40px;
    margin-left: auto;
    margin-right: 30px;
    cursor: pointer;
`

const FilledHeart = styled(Heart)`
    width: 40px;
    margin-left: auto;
    margin-right: 30px;
    cursor: pointer;
`

export const MateCard = (props) => {
    let history = useHistory();
    const [liked, setLiked] = useState(false);

    const handleChange = event => {
        setLiked(!liked);
    }

    const handleRedirect = event => {
        history.push('/mate/detail')
    }

    let heart = null;
    if (liked){
        heart = <FilledHeart onClick={handleChange}/>
    } else {
        heart = <EmptyHeart onClick={handleChange}/>
    }

    return (
        <Container>
            <Image src={props.src} onClick={handleRedirect}/>
            <Description>
                <Title onClick={handleRedirect}>{props.title}</Title>
                <Detail>{props.age}</Detail>
                <Detail>{props.location}</Detail>
                <Detail>{props.features}</Detail>                
            </Description>
            {heart}
           
        </Container>
    )
}
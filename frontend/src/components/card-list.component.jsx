import React from 'react';
import styled from 'styled-components';
import { MessageCard } from './message-card.component';
import { OfferCard } from './offer-card.component'; 
import { FavCard } from './fav-card.component';

const Container = styled.div`
    width: 100%;
`

export const CardList = (props) => {

    return (
        <Container>
            <MessageCard />
            <OfferCard />
            <FavCard/>
        </Container>
    )

}
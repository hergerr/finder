import React from 'react';
import styled from 'styled-components';
import { CardList } from '../components/card-list.component';

const Container = styled.div`
    width: 100%;
`

const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 150px;

    p {
        margin-left: 90px;
        font-size: 20px;
        font-weight: bold;
    }

`


class AccountPage extends React.Component {

    render() {
        return (
            <Container>
                <MenuContainer>
                <p>Messages</p>
                <p>Offers</p>
                <p>Favourites</p>
                </MenuContainer>
                <CardList></CardList>
            </Container>
        )
    }
}

export { AccountPage }
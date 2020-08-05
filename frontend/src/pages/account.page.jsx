import React from 'react';
import styled from 'styled-components';
import {
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import { CardList } from '../components/card-list.component';
import { MessageCard } from '../components/message-card.component';
import { OfferCard } from '../components/offer-card.component'; 
import { FavCard } from '../components/fav-card.component';

const Container = styled.div`
    width: 100%;
`

const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 150px;

    a {
        color: black;
        text-decoration: none;
        margin-left: 90px;
        font-size: 20px;
        font-weight: bold;
    }

`


class AccountPage extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <Container>
                <MenuContainer>
                    <Link to={`${this.props.match.url}/messages`}>Messages</Link>
                    <Link to={`${this.props.match.url}/favs`}>Offers</Link>
                    <Link to={`${this.props.match.url}/offers`}>Favourites</Link>
                </MenuContainer>

                <Switch>
                        <Route path={`${this.props.match.url}/offers`}>
                            <OfferCard />
                        </Route>
                        <Route path={`${this.props.match.url}/favs`}>
                            <FavCard />
                        </Route>
                        <Route path={`${this.props.match.url}/messages`}>
                            <MessageCard />
                        </Route>
                    </Switch>

            </Container>
        )
    }
}

// daje wglad do match i history
export default withRouter(AccountPage)
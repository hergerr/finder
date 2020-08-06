import React from 'react';
import styled from 'styled-components';
import {
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import axios from 'axios';
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

    constructor(props) {
        super(props);
        this.state = { offers: [], favsRooms: [], favMates:[], messages: [] }
    }

    componentDidMount() {
        // TODO fav mate
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        };

        axios.get('http://localhost:8000/user_room_list/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ offers: res.data });
            }
        })

        axios.get('http://localhost:8000/get_liked_room_offers/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ favsRooms: res.data });
            }
        })

        axios.get('http://localhost:8000/get_user_conversations/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ messages: res.data });
            }
        })
    }


    render() {

        return (

            <Container>
                <MenuContainer>
                    <Link to={`${this.props.match.url}/messages`}>Messages</Link>
                    <Link to={`${this.props.match.url}/offers`}>Offers</Link>
                    <Link to={`${this.props.match.url}/favs`}>Favourites</Link>
                </MenuContainer>

                <Switch>
                    <Route path={`${this.props.match.url}/offers`}>
                        {
                            this.state.offers.map(
                                (element, index) => (
                                    <OfferCard
                                        key={index}
                                        title={element.title}
                                        location={element.location}
                                        area={element.area}
                                        flatmates={element.number_of_flatmates} />
                                ))
                        }
                    </Route>
                    <Route path={`${this.props.match.url}/favs`}>
                        {
                            this.state.favsRooms.map(
                                (element, index) => (
                                    <FavCard
                                        key={index}
                                        title={element.title}
                                        location={element.location}
                                        area={element.area}
                                        flatmates={element.number_of_flatmates}
                                    />
                            ))
                        }
                    </Route>
                    <Route path={`${this.props.match.url}/messages`}>
                        {/* <MessageCard /> */}
                    </Route>
                </Switch>

            </Container>
        )
    }
}

// daje wglad do match i history
export default withRouter(AccountPage)
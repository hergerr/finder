import React from 'react';
import styled from 'styled-components';
import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from "react-router-dom";
import axios from 'axios';
import { MessageCard } from '../components/message-card.component';
import { OfferCard } from '../components/offer-card.component';
import { FavCard } from '../components/fav-card.component';

const Container = styled.div`
    width: 100%;

    a {
        color: black;
        text-decoration: none;
    }
`

const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 150px;

    a {
        margin-left: 90px;
        font-size: 20px;
        font-weight: bold;
    }

`

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: var(--color-orange);
  }
`


class AccountPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { roomOffers: [], mateOffers: [], favsRooms: [], favMates: [], messages: [] }
    }

    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        };

        axios.get('http://localhost:8000/user_room_list/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ roomOffers: res.data });
                console.log(this.state.roomOffers);

            }
        })

        axios.get('http://localhost:8000/user_mate_list/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ mateOffers: res.data });
            }
        })

        axios.get('http://localhost:8000/get_liked_room_offers/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ favsRooms: res.data });
            }
        })

        axios.get('http://localhost:8000/get_liked_mate_offers/',
            config
        ).then(res => {
            if (res.status === 200) {
                this.setState({ favMates: res.data });
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

    handleFavDelete = (type, id) => {
        if (type === 'room') {
            axios.delete('http://localhost:8000/delete_liked_room_offer/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                },
                data: {
                    id: id
                }
            }
            ).then(res => {
                if (res.status === 200) {
                    this.setState({ favsRooms: res.data })
                }
            })
        } else if (type === 'mate') {
            axios.delete('http://localhost:8000/delete_liked_mate_offer/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                },
                data: {
                    id: id
                }
            }
            ).then(res => {
                if (res.status === 200) {
                    this.setState({ favMates: res.data })
                }
            })
        }

    }

    handleOfferDelete = (type, id) => {
        if (type === 'room') {

            axios.delete('http://localhost:8000/user_room_detail/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                },
                data: {
                    id: id
                }
            }
            ).then(res => {
                if (res.status === 200) {
                    this.setState({ roomOffers: res.data })
                }
            })
        } else if (type === 'mate') {

            axios.delete('http://localhost:8000/user_mate_detail/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                },
                data: {
                    id: id
                }
            }
            ).then(res => {
                if (res.status === 200) {
                    this.setState({ mateOffers: res.data })
                }
            })
        }
    }


    render() {

        return (

            <Container>
                <MenuContainer>
                    <StyledLink to={`${this.props.match.url}/messages`}>Messages</StyledLink>
                    <StyledLink to={`${this.props.match.url}/offers`}>Offers</StyledLink>
                    <StyledLink to={`${this.props.match.url}/favs`}>Favourites</StyledLink>
                </MenuContainer>

                <Switch>
                    <Route path={`${this.props.match.url}/offers`}>
                        {
                            this.state.roomOffers.map(
                                (element) => (
                                    <OfferCard
                                        id={element.id}
                                        key={element.id}
                                        link_to={`/rooms/${element.id}`}
                                        type="room"
                                        title={element.title}
                                        location={element.location}
                                        area={element.area}
                                        image={element.photos[0] ? element.photos[0].image : ''}
                                        flatmates={element.number_of_flatmates}
                                        handleDelete={this.handleOfferDelete}
                                    />

                                ))
                        }

                        {
                            this.state.mateOffers.map(
                                (element) => (
                                    <OfferCard
                                        id={element.id}
                                        key={element.id}
                                        link_to={`/mates/${element.id}`}
                                        type="mate"
                                        title={element.title}
                                        age={element.age}
                                        location={element.location}
                                        features={element.features}
                                        image={element.image}
                                        handleDelete={this.handleOfferDelete}
                                    />

                                )
                            )
                        }
                    </Route>
                    <Route path={`${this.props.match.url}/favs`}>
                        {
                            this.state.favsRooms.map(
                                (element) => (
                                    <FavCard
                                        id={element.id}
                                        key={element.id}
                                        link_to={`/rooms/${element.id}`}
                                        type="room"
                                        title={element.title}
                                        location={element.location}
                                        area={element.area}
                                        flatmates={element.number_of_flatmates}
                                        handleDelete={this.handleFavDelete}
                                    />

                                ))
                        }

                        {
                            this.state.favMates.map(
                                (element) => (
                                    <FavCard
                                        id={element.id}
                                        key={element.id}
                                        link_to={`/mates/${element.id}`}
                                        type="mate"
                                        title={element.title}
                                        age={element.age}
                                        location={element.location}
                                        features={element.features}
                                        handleDelete={this.handleFavDelete}
                                        image={element.image}
                                    />

                                )
                            )
                        }
                    </Route>
                    <Route path={`${this.props.match.url}/messages`}>
                        {
                            this.state.messages.map(
                                (element) => (
                                    <Link to={`/conversations/${element.id}`} key={element.id}>
                                        <MessageCard
                                            id={element.id}
                                            key={element.id}
                                            subject={element.subject}
                                            last_message={element.message.slice(-1)[0].content}
                                            email={element.members[1].email}
                                        />
                                    </Link>
                                )
                            )
                        }
                    </Route>
                </Switch>

            </Container>
        )
    }
}

// daje wglad do match i history
export default withRouter(AccountPage)
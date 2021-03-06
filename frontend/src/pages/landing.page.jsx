import React from 'react';
import styled from 'styled-components';
import LoginPopup from '../components/login-popup.component';
import { RegisterPopup } from '../components/register-popup.component';
import { MatePopup } from '../components/mate-popup.component';
import { RoomPopup } from '../components/room-popup.component';

const Container = styled.div`
    background-image: url(${props => props.image});
    width: 100%;
    height: 100vh;
    margin-top: -60px;
`

const Title = styled.p`
    color: white;
    font-size: 60px;
    position: absolute;
    top: 40%;
    left: 30%;
`

const Button = styled.button`
    color: white;
    font-size: 30px;
    border-radius: 10px;
    padding: 10px 30px;
    background-color: var(--color-orange);
    position: absolute;
    z-index: 1;
    top: 60%;
    left: 50%;
    cursor: pointer;
`

const PopupContainer = styled.div`
    z-index: 2;
    position: absolute;
    top: 18%;
    left: 37%;
`

const SearchContainer = styled(PopupContainer)`
    width: 500px;
`

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showSearchPopup: false};
    }

    handleClosing = (e) => {
        this.setState({showSearchPopup: !this.state.showSearchPopup});
    }

    render() {
        let popup;
        if(this.state.showSearchPopup && this.props.title.includes("mate")){
            popup = <MatePopup closeHandler={this.handleClosing} />
        } else if (this.state.showSearchPopup && this.props.title.includes("room")){
            popup = <RoomPopup closeHandler={this.handleClosing} />
        } else {
            popup = null;
        }
        return (
            <Container image={this.props.image}>
                <Title>{this.props.title}</Title>
                {this.props.renderLoginPopup &&
                    <PopupContainer>
                        <LoginPopup 
                            handleLoginClosing={this.props.handleLoginClosing}
                            handleRegisterClosing={this.props.handleRegisterClosing}
                            handleSwitchVisibility={this.props.handleSwitchVisibility}
                            handleLoginButtonChange={this.props.handleLoginButtonChange} />
                    </PopupContainer>
                }
                {this.props.renderRegisterPopup &&
                    <PopupContainer>
                        <RegisterPopup 
                            handleLoginClosing={this.props.handleLoginClosing}
                            handleRegisterClosing={this.props.handleRegisterClosing}
                            handleSwitchVisibility={this.props.handleSwitchVisibility}
                        />
                    </PopupContainer>
                }
                <Button onClick={ e => {
                    this.setState({showSearchPopup: !this.state.showSearchPopup})
                } }>Search</Button>  
                <SearchContainer>
                    {popup}
                </SearchContainer>
            </Container>
        )

    }
}

export { LandingPage }
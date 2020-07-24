import React from 'react';
import styled from 'styled-components';
import { LoginPopup } from '../components/login-popup.component';
import { MatePopup } from '../components/mate-popup.component';


const Container = styled.div`
`

const Title = styled.p`
    color: white;
    font-size: 60px;
    position: absolute;
    top: 40%;
    left: 30%;
`

const Image = styled.img`
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
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
    z-index: 20;
    position: absolute;
    top: 36%;
    left: 37%;
`

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showSearchPopup: false};
    }

    render() {
        let popup;
        if(this.state.showSearchPopup && this.props.title.includes("mate")){
            popup = <MatePopup/>
        } else {
            popup = "ndasjkndjkasnkj";
        }

        return (
            <Container>
                <Title>{this.props.title}</Title>
                {/* <Image src={this.props.image} alt="page background"/> */}
                {this.props.render_login_popup &&
                    <PopupContainer>
                        <LoginPopup/>
                    </PopupContainer>
                }
                <Button onClick={ e => {
                    this.setState({showSearchPopup: !this.state.showSearchPopup})
                } }>Search</Button>  
                {/* {popup} */}
                <MatePopup/>
            </Container>
        )

    }
}

export { LandingPage }
import React from 'react';
import './landing-page.styles.css';
import room_landing from '../../assets/images/room_landing.jpg';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <p>Find your place in Wrocław</p>
                <img src={room_landing}></img>
            </div>
        )

    }
}

export { LandingPage }
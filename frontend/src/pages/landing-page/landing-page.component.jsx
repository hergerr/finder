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
                <p className="LandingPage-title">Find your place in Wrocław</p>
                <img className="LandingPage-image" src={room_landing}></img>
                <button className="LandingPage-button">Search</button> 
            </div>
        )

    }
}

export { LandingPage }
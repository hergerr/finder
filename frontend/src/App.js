import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import room_landing from './assets/images/room_landing.jpg';
import mate_landing from './assets/images/mate_landing.jpg';
import { LandingPage } from './pages/landing-page/landing-page.component';


const App = styled.div`
`

const NavContainer = styled.div`
  background-color: #E5E5E5;
`

const Nav = styled.nav`
  position: absolute;
  z-index: 2;
  right: 20px;

  li {
    float: right;
    list-style-type: none;
    background-color: white;
    padding: 5px;
    border: 1px solid black;
    border-radius: 3px;
    margin-right: 10px;

    a {
      display: block;
      text-align: center;
      padding: 1px 16px;
      text-decoration: none;
      color: black;
    }
  }
`

const Logo = styled.p`
  font-family: 'Nova Slim', cursive;
  margin: 0;
  position: absolute;
  z-index: 2;
  top: 15px;
  left: 15px;
  font-size: 35px;
`



class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "/mates", title: "mate", buttonText: "room", displayLoginPopup: false };
  }

  render() {

    return (
      <App>
        <Logo>{this.state.title}Finder</Logo>
        <Router>
          <NavContainer>
            <Nav>
              <ul>
                <li>
                  <Link to={this.state.url} onClick={e => {
                    if (this.state.url === "/mates") {
                      this.setState({ url: "/", title: "room", buttonText: "mate" });
                    } else {
                      this.setState({ url: "/mates", title: "mate", buttonText: "room" });
                    }
                  }}>Find {this.state.buttonText}</Link>
                </li>
                <li>
                  <Link to="/offer">Add offer</Link>
                </li>
                <li>
                  <Link to="/account" onClick={e => {
                    this.setState({ displayLoginPopup: !this.state.displayLoginPopup });
                  }}>My account</Link>
                </li>
              </ul>
            </Nav>

            <Switch>
              <Route path="/about">
                {/* <About /> */}
              </Route>
              <Route path={this.state.url}>
                <LandingPage title={`Find your ${this.state.title} in Wrocław`} image={mate_landing} render_login_popup={this.state.displayLoginPopup} />
              </Route>
              <Route path="/">
                <LandingPage title={`Find your ${this.state.title} in Wrocław`} image={room_landing} render_login_popup={this.state.displayLoginPopup} />
              </Route>
            </Switch>
          </NavContainer>
        </Router>

      </App>
    );
  }
}

export default Application;

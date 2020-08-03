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
import { LandingPage } from './pages/landing.page';
import { MateListPage } from './pages/mate-list.page';
import { MateDetailPage } from './pages/mate-detail.page';
import { AccountPage } from './pages/account.page';
import { AddMatePage } from './pages/add-mate.page';
import { ConversationPage } from './pages/conversation.page';

const App = styled.div`
  width: 100%;
`

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
  z-index: 1;
`

const Nav = styled.nav`
  /* width: 1200px;
  margin: 0 auto;
  height: 70px; */

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
  position: absolute;
  font-size: 35px;
  margin: 0 20px;
  float:left;

  a {
    text-decoration:none;
    color: black;
  }
`



class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "/mates", title: "mate", buttonText: "room", displayLoginPopup: false, displayRegisterPopup: false };
  }

  handleLoginClosing = (e) => {
    this.setState({ displayLoginPopup: !this.state.displayLoginPopup });
  }

  handleRegisterClosing = (e) => {
    this.setState({ displayRegisterPopup: !this.state.displayRegisterPopup });
  }

  handleSwitchVisibility = (e) => {
    this.setState({ displayRegisterPopup: !this.state.displayRegisterPopup });

    this.setState({ displayLoginPopup: !this.state.displayLoginPopup });
  }

  render() {

    return (
      <App>
        <Router>
          <NavContainer>
            <Logo>
              <Link to={this.state.url}>
                {this.state.title}Finder
            </Link>
            </Logo>

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
                  {/* pokaz lub schowaj dialog do rejestracji lub logowania */}
                  <Link to="/" onClick={e => {
                    this.setState({ displayLoginPopup: !this.state.displayLoginPopup });
                  }}>My account</Link>
                </li>
              </ul>
            </Nav>
          </NavContainer>

          <Switch>
            <Route path="/mate/add">
              <AddMatePage />
            </Route>
            <Route path="/mate/detail">
              <MateDetailPage src={room_landing} />
            </Route>
            <Route path="/mate/list">
              <MateListPage />
            </Route>
            <Route path="/offer">
              <AccountPage />
            </Route>
            <Route path="/conversation">
              <ConversationPage />
            </Route>
            <Route path={this.state.url}>
              <LandingPage
                title={`Find your ${this.state.title} in Wrocław`}
                image={mate_landing}
                renderLoginPopup={this.state.displayLoginPopup}
                renderRegisterPopup={this.state.displayRegisterPopup}
                handleLoginClosing={this.handleLoginClosing}
                handleRegisterClosing={this.handleRegisterClosing}
                handleSwitchVisibility={this.handleSwitchVisibility} />
            </Route>
            <Route path="/">
              <LandingPage
                title={`Find your ${this.state.title} in Wrocław`}
                image={room_landing}
                renderLoginPopup={this.state.displayLoginPopup}
                renderRegisterPopup={this.state.displayRegisterPopup}
                handleLoginClosing={this.handleLoginClosing}
                handleRegisterClosing={this.handleRegisterClosing}
                handleSwitchVisibility={this.handleSwitchVisibility} />
            </Route>
          </Switch>
        </Router>

      </App>
    );
  }
}

export default Application;

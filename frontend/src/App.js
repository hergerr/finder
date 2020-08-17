import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import room_landing from './assets/images/room_landing.jpg';
import mate_landing from './assets/images/mate_landing.jpg';
import { LandingPage } from './pages/landing.page';
import MateListPage from './pages/mate-list.page';
import MateDetailPage from './pages/mate-detail.page';
import RoomDetailPage from './pages/room-detail.page';
import AccountPage from './pages/account.page';
import AddMatePage from './pages/add-mate.page';
import ConversationPage from './pages/conversation.page';
import AccountConfirmedPage from './pages/account-confirmed.page';
import { getSession, logOut } from './assets/auth-utils';
import PrivateRoute from './components/private-route.component';
import PublicRoute from './components/public-route.component';
import { ForgotPasswordPage } from './pages/forgot-password.page';
import ResetPasswordPage from './pages/reset-password.page';

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

    a, p {
      display: block;
      text-align: center;
      padding: 1px 16px;
      text-decoration: none;
      color: black;
      cursor: pointer;
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
    this.state = { url: "/rooms", title: "mate", buttonText: "room", displayLoginPopup: false, displayRegisterPopup: false, logged: false, userData: {} };
  }

  componentDidMount() {
    const session = getSession();

    if (session) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
      };

      axios.get('http://localhost:8000/get_user/',
        config).then(res => {
          if (res.status === 200) {
            this.setState({ logged: true });
            this.setState({ userData: res.data })
            console.log(this.state.userData);
          }
        })

    }
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

  handleLoginButtonChange = (e) => {
    this.setState({ logged: true });

    // and close window after succesful login
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
                  <p onClick={e => {
                    if (!this.state.logged) {
                      this.setState({ displayLoginPopup: !this.state.displayLoginPopup });
                    }
                    else if (this.state.logged) {
                      logOut();
                      this.setState({ logged: false });
                    }
                  }}>
                    {this.state.logged ? "Logout" : "Login"}
                  </p>
                </li>
                <li>
                  <Link to={this.state.url} onClick={e => {
                    if (this.state.url === "/mates") {
                      this.setState({ url: "/rooms", title: "mate", buttonText: "room" });
                    } else {
                      this.setState({ url: "/mates", title: "room", buttonText: "mate" });
                    }
                  }}>Find {this.state.buttonText}</Link>
                </li>

                {
                  this.state.logged &&
                  <li>
                    <Link to={`/add${this.state.url}`}>Add {this.state.url.slice(1, -1)}</Link>
                  </li>
                }

                {
                  this.state.logged &&
                  <li>
                    <Link to="/account/messages" >My account</Link>
                  </li>
                }
              </ul>
            </Nav>
          </NavContainer>

          <Switch>
            <PrivateRoute component={ConversationPage} path="/conversations/:conversationId" />
            <PublicRoute component={RoomDetailPage} path='/rooms/:offerId' />
            <PublicRoute component={MateDetailPage} path='/mates/:offerId' />
            <PrivateRoute component={AddMatePage} path="/edit/mates/:offerId" />
            <PublicRoute component={AccountConfirmedPage} path="/verify-user" />
            <PublicRoute component={ResetPasswordPage} path="/reset-password" />
            <PublicRoute component={MateListPage} path="/mate/list/" />
            <PrivateRoute component={AddMatePage} path="/add/mates" />
            <PrivateRoute component={AccountPage} path="/account" />
            <PublicRoute component={ForgotPasswordPage} path="/forgot-password" />
            <Route path="/mates">
              <LandingPage
                title={`Find your mate in Wrocław`}
                image={mate_landing}
                renderLoginPopup={this.state.displayLoginPopup}
                renderRegisterPopup={this.state.displayRegisterPopup}
                handleLoginClosing={this.handleLoginClosing}
                handleRegisterClosing={this.handleRegisterClosing}
                handleSwitchVisibility={this.handleSwitchVisibility}
                handleLoginButtonChange={this.handleLoginButtonChange} />
            </Route>
            <Route path="/rooms">
              <LandingPage
                title={`Find your room in Wrocław`}
                image={room_landing}
                renderLoginPopup={this.state.displayLoginPopup}
                renderRegisterPopup={this.state.displayRegisterPopup}
                handleLoginClosing={this.handleLoginClosing}
                handleRegisterClosing={this.handleRegisterClosing}
                handleSwitchVisibility={this.handleSwitchVisibility}
                handleLoginButtonChange={this.handleLoginButtonChange} />
            </Route>
            <Redirect from="/" to="/mates" exact />
          </Switch>
        </Router>

      </App >
    );
  }
}

export default Application;

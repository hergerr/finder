import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import room_landing from './assets/images/room_landing.jpg';
import mate_landing from './assets/images/mate_landing.jpg';
import { LandingPage } from './pages/landing-page/landing-page.component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "/mates", title: "mate", buttonText: "room", displayLoginPopup: false };
  }

  render() {

    return (
      <div className="App">
        <p className="App-logo">{this.state.title}Finder</p>
        <Router>
          <div className="App-nav-container">
            <nav className="App-nav">
              <ul>
                <li>
                  <Link to={this.state.url} onClick={e => {
                    if (this.state.url === "/mates") {
                      this.setState({url: "/", title: "room", buttonText: "mate"});
                    } else {
                      this.setState({url: "/mates", title: "mate", buttonText: "room"});
                    }
                  }}>Find {this.state.buttonText}</Link>
                </li>
                <li>
                  <Link to="/offer">Add offer</Link>
                </li>
                <li>
                  <Link to="/account" onClick={e => {
                    this.setState({displayLoginPopup: !this.state.displayLoginPopup});
                  }}>My account</Link>
                </li>
              </ul>
            </nav>

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
          </div>
        </Router>
      </div>

    );
  }
}

export default App;

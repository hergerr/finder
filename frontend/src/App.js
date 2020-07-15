import React, { useState } from 'react';
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

function App() {
  const [url, setUrl] = useState("/mates");
  const [title, setTitle] = useState("mate");
  const [buttonText, setButtonText] = useState("room");
  const [displayLoginPopup, setDisplayLoginPopup] = useState(false);

  return (
    <div className="App">
      <p className="App-logo">{title}Finder</p>
      <Router>
        <div>
          <nav className="App-nav">
            <ul>
              <li>
                <Link to={url} onClick={e => {
                  if (url === "/mates"){
                    setUrl("/");
                    setTitle("room");
                    setButtonText("mate")
                  } else {
                    setUrl("/mates");
                    setTitle("mate");
                    setButtonText("room");
                  }
                }}>Find {buttonText}</Link>
              </li>
              <li>
                <Link to="/offer">Add offer</Link>
              </li>
              <li>
                <Link to="/account" onClick={e => {
                  setDisplayLoginPopup(!displayLoginPopup);
                }}>My account</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              {/* <About /> */}
            </Route>
            <Route path={url}>
              <LandingPage title={`Find your ${title} in Wrocław`} image={mate_landing} render_login_popup={displayLoginPopup}/>
            </Route>
            <Route path="/">
              <LandingPage title={`Find your ${title} in Wrocław`} image={room_landing} render_login_popup={displayLoginPopup}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;

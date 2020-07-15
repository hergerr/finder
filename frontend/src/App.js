import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { LandingPage } from './pages/landing-page/landing-page.component'

function App() {
  return (
    <div className="App">
    <p className="App-logo">MateFinder</p>
    <Router>
      <div>
        <nav className="App-nav">
          <ul>
            <li>
              <Link to="/">Find mates</Link>
            </li>
            <li>
              <Link to="/about">Add offer</Link>
            </li>
            <li>
              <Link to="/users">My account</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          <Route path="/users">
            {/* <Users /> */}
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>

  );
}

export default App;

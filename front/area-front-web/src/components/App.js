import React from 'react';
import '../styles/App.css';
import Authentication from './Authentication';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from '../containers/LandingContainer';
import { createBrowserHistory } from 'history';
import Home from '../containers/HomeContainer';
import Signup from '../containers/SignupContainer';
import Areas from '../containers/AreasContainer';
import Settings from '../containers/SettingsContainer';
import DownloadApk from "../containers/DownloadApkContainer";

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super();
    global.REACT_SUPPORT = 'WEB';
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/signin">
              <Authentication history={history} />
            </Route>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/signup">
              <Signup history={history} />
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/services">
              <Areas />
            </Route>
            <Route path="/settings">
              <Settings/>
            </Route>
            <Route path="/client.apk">
              <DownloadApk/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

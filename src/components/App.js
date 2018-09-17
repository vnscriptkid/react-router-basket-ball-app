import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Players from "./Players";
import Teams from "./Teams";
import TeamPage from "./TeamPage";
import Articles from "./Articles";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route path="/:teamId" exact component={TeamPage} />
            <Route path="/:teamId/articles" component={Articles} />
            <Route
              render={() => <h1 style={{ textAlign: "center" }}>404!</h1>}
            />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;

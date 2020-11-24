import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GamePage from "./pages/GamePage";
import AcceptChallengePage from "./pages/AcceptChallengePage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/game/:gameId" component={GamePage} />
          <Route
            exact
            path="/game/:gameId/accept"
            component={AcceptChallengePage}
          />

          <Redirect to="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;

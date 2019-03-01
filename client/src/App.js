import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentStart } from "./actions/startActions";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./components/landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateHandle from "./components/create-handle/CreateHandle";
import EditHandle from "./components/edit-handle/EditHandle";
import AddBookmark from "./components/bookmarks/AddBookmark";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentStart());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Header />
            <div>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-handle"
                  component={CreateHandle}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-handle"
                  component={EditHandle}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-bookmark"
                  component={AddBookmark}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

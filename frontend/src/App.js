import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { setCurrentUser, logoutUser } from "./actions/authentication";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CustomerList from "./components/Home/CustomerList/CustomerList";
import FarmFields from "./components/Home/FormFields/FarmFields";
import FarmFieldDetail from "./components/Home/FormFields/FarmFieldDetail";

import baseTheme from "./baseTheme";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import './App.css'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
} else if (
  window.location.pathname !== "/login" &&
  window.location.pathname !== "/register"
) {
  window.location.href = "/login";
}

class App extends Component {
  render() {
    const theme = createMuiTheme({ ...baseTheme });
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <Fragment>
              <Navbar />
              <div
                style={{ backgroundColor: "rgb(236, 236, 236)", padding: 30 }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 15,
                    minHeight: "500px",
                    borderRadius: "5px"
                  }}
                >
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/customer" component={CustomerList} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route
                      exact={true}
                      path="/farm/:id/fields"
                      component={FarmFields}
                    />
                    <Route
                      path="/farm/:id/fields/:fieldId"
                      component={FarmFieldDetail}
                    />
                  </Switch>
                </div>
              </div>
            </Fragment>
            <ToastContainer autoClose={3000} hideProgressBar={true} />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;

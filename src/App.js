import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import config from "./config";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();
  

  // useEffect(() => {
  //   onLoad();
  // }, []);
  useEffect(() => {
    onLoad();
    loadFacebookSDK();
  }, []);
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }
  // async function onLoad() {
  //   loadFacebookSDK();
  //   try {
  //     await Auth.currentSession();
  //     userHasAuthenticated(true);
  //   } catch (e) {
  //     if (e !== "No current user") {
  //       onError(e);
  //     }
  //   }
  //   setIsAuthenticating(false);
  // }

  // function loadFacebookSDK() {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: config.social.FB,
  //       autoLogAppEvents: true,
  //       xfbml: true,
  //       version: 'v3.1'
  //     });
  //   };

  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  // }

  function loadFacebookSDK() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.1",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }
  
    return (
      !isAuthenticating && (
        <div className="App container py-3">
          <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
            <LinkContainer to="/">
              <Navbar.Brand style={{ fontWeight: "bold", color: "black" }}className="logo">
                Notes
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav activeKey={window.location.pathname}>
                {isAuthenticated ? (
                  <>
                    <LinkContainer to="/settings">
                      <Nav.Link>Settings</Nav.Link>
                    </LinkContainer>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/signup">
                      <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
              <Routes />
            </AppContext.Provider>
          
        </div>
      )
    );
    
}

export default App;

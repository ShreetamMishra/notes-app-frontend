import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";

export default function FacebookLoginCallback() {
  const location = useLocation();
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    async function handleLoginCallback() {
      try {
        if (code) {
          // Handling Facebook login callback
          const response = await Auth.federatedSignIn("facebook", { token: code });
          // Perform any additional actions with the response if needed
        } else {
          // Handling normal login callback
          await Auth.currentSession();
        }
        // Set the user as authenticated
        userHasAuthenticated(true);
        // Redirect to the desired page
        history.push("/");
      } catch (error) {
        onError(error);
        // Handle any error during the login callback process
      }
    }

    handleLoginCallback();
  }, [location.search, history, userHasAuthenticated]);

  return <div>Processing login...</div>;
}

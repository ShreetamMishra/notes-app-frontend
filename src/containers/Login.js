import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Login.css";
import { Link } from "react-router-dom";
// import
// FacebookButton from "../components/FacebookButton";
// import FacebookLoginButton from "../components/FacebookButton";
// import { FacebookLoginButton } from "react-social-login-buttons";
import heroImage1 from "./image/hero1.png";



export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
//   handleFbLogin = () => {
// this.props.userHasAuthenticated(true);
// };
// function handleFbLogin() {
  // Perform the Facebook login action here
  // You can customize this function based on your requirements
// }
  return (
    <div className="Login">
      <div className="log">
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group> */}
        <Form.Group size="lg" controlId="email">
        {/* <Form.Label>Email</Form.Label> */}
        <Form.Control
           autoFocus
           type="email"
           placeholder="Enter your email"
           value={fields.email}
           onChange={handleFieldChange}
          
        />
</Form.Group>
        <Form.Group size="lg" controlId="password">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="Password"
            value={fields.password}
            onChange={handleFieldChange}
            
          />
        </Form.Group>
        {/* <FacebookButton onLogin={this.handleFbLogin}/><hr /> */}
        <Link to="/login/reset" className="custom-link">Forgot password?</Link>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
          className="custom-loader-button"
        >
          Login
        </LoaderButton>
        {/* <hr />
        <a
          href={`https://www.facebook.com/v17.0/dialog/oauth?client_id=651928649757855&redirect_uri=${encodeURIComponent(
            "http://localhost:3000/login/callback"
          )}`}
        >
          <FacebookLoginButton size="small" onClick={handleFbLogin} />
        </a> */}
      </Form>
      
      </div>
      <div className="hero1">
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      <img src={heroImage1} alt="bubble" />
      
        </div>
    </div>
  );
}

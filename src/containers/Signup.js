import React, { useState } from "react";//change
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";
// import
// FacebookButton from "../components/FacebookButton";
import { FacebookLoginButton } from "react-social-login-buttons";
// import FacebookLoginButton from "../components/FacebookButton";
import "../components/FacebookButton.css";
import Image from "./image/hero2.png";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });

  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   // Change the body background color here
  //   document.body.classList.add("hero");

  //   // Clean up the body background color when the component unmounts
  //   return () => {
  //     document.body.classList.remove("hero");
  //   };
  // }, []);
  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
 

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  // handleFbLogin = () => {
  //   this.props.userHasAuthenticated(true);
  //   };
  async function handleFbLogin() {
    // event.preventDefault();
    // setIsLoading(true);
    // try {
    //   await Auth.signIn(fields.email, fields.password);
    //   userHasAuthenticated(true);
    //   history.push("/");
    // } catch (e) {
    //   onError(e);
    //   setIsLoading(false);
    // }
  }
  
  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          {/* <Form.Label>Email</Form.Label> */}
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            placeholder="Enter your email"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            value={fields.password}
            placeholder="Enter your Password"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          {/* <Form.Label>Confirm Password</Form.Label> */}
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            placeholder="Confirm Password"
            value={fields.confirmPassword}
          />
        </Form.Group>
        {/* <FacebookButton onLogin={this.handleFbLogin}/><hr /> */}
        <LoaderButton
          block
          size="lg"
          type="submit"
          // variant="success"
          style={{ backgroundColor: '#07fe2c', color: 'white' }}
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
        <hr />
      <div style={{  display: "flex", justifyContent: "center"}}>
        <a href={`https://www.facebook.com/v17.0/dialog/oauth?client_id=651928649757855&redirect_uri=${encodeURIComponent("http://localhost:3000/login/new/notes")}`}>
          <FacebookLoginButton size="small" onClick={handleFbLogin} />
        </a>
      </div>
      </Form>
    );
  }

  return (
    <div className="Signup">
      
      {/* {newUser === null ? renderForm() : renderConfirmationForm()} */}
      <div className="sign">
      {newUser === null ? renderForm() : renderConfirmationForm()}
      </div>
      <div className="hero2">
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      <img src={Image} alt="bubble" />
      </div>
      
      
    </div>
    
    
  );
}

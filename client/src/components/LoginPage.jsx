import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// import { signInWithGoogle } from "./firebase"; // Import the function for signing in with Google
import axios from "axios";

const LoginPage = () => {
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loginError, setLoginError] = useState("");

  // const navigate = useNavigate();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleMouseMove = (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    setBackgroundPosition({ x: xAxis, y: yAxis });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // console.log("email => " + email);
    // console.log("password => " + password);

    // You can implement your login logic here
    try {
      // Send login request to server
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Check if login was successful
      if (response.data.success) {
        // Redirect user to dashboard or another page
        // You can use React Router for navigation
        console.log("Login successful");
        if (response.data.isAdmin) {
          navigate("/Home");
        } else {
          navigate("/Header");
        }
      } else {
        // Display error message if login failed
        setLoginError("Email or password is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      setLoginError("Email or password is incorrect. Please try again.");
    }, 100);
  };

  // Function to handle sign in with Google
  // const handleSignInWithGoogle = async () => {
  //   try {
  //     // Send GET request to the server's /auth/google endpoint
  //     window.open("http://localhost:3000/auth/google"), "_self";
  //     // navigate("/Home");
  //   } catch (error) {
  //     console.error("There was a problem with the request:", error);
  //     setIsButtonClicked(true);
  //     setTimeout(() => {
  //       setIsButtonClicked(false);
  //       setLoginError("Authentication failed. Please try again.");
  //     }, 100);
  //     navigate("/LoginPage");
  //   }
  // };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div
        className="position-fixed top-0 start-0 w-100 h-100 background"
        style={{
          backgroundImage: "url('tu-imagen.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: "-1",
          transform: `translate(${backgroundPosition.x}px, ${backgroundPosition.y}px)`,
        }}
      ></div>
      <div
        className="login-container bg-secondary bg-opacity-10 rounded p-3 shadow"
        style={{ width: "400px" }}
      >
        <div className="login-header text-center mb-4">
          <h2 className="text-primary mb-2">
            Welcome to <span className="text-info">MNNIT-IGNOU</span>
          </h2>
          <p className="opacity-70">Login to your account</p>
        </div>
        <div className="login-form text-center">
          <Form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fas fa-envelope text-primary"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                ref={emailRef}
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fas fa-lock text-primary"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                ref={passwordRef}
                required
              />
            </div>
            {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            )}
            <div className="options d-flex justify-content-between mb-3">
              <label htmlFor="remember" className="d-flex align-items-center">
                <input type="checkbox" id="remember" className="me-2" />{" "}
                Remember me
              </label>
              <a
                href="#"
                className="forgot-password text-primary text-decoration-none"
              >
                Forgot Password?
              </a>
            </div>
            <Button
              type="submit"
              variant="outline-primary"
              className={`text-bold ${isButtonClicked ? "clicked" : ""}`}
            >
              Login
            </Button>
            {/* <Button
              variant="outline-primary"
              className="m-2"
              onClick={handleSignInWithGoogle}
            >
              Sign in with Google
            </Button> */}
          </Form>
        </div>
        <div className="signup-link text-center mt-3 opacity-70">
          Don't have an account?{" "}
          <a
            href="https://ignou.samarth.edu.in/index.php/studentlogin/registration/register"
            className="text-primary text-decoration-none"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

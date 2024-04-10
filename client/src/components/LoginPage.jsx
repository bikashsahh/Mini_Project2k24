import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.data.success) {
        window.localStorage.setItem("isLogedIn", true);
        if (response.data.isAdmin) {
          navigate("/Home");
        } else {
          navigate("/Header");
        }
      } else {
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

  return (
    <div
      className="d-flex align-items-center justify-content-end"
      style={{
        height: "100vh",
        padding: "170px",
        overflow: "hidden",
      }}
    >
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          // filter: "blur(0px)", // Adjust blur intensity as needed
          zIndex: "-1",
          // transform: `translate(${backgroundPosition.x}px, ${backgroundPosition.y}px)`,
          backgroundImage: "url('loginbg4.jpeg')", // Add background image here
        }}
      ></div>
      <div className="" style={{ width: "400px", zIndex: "2" }}>
        <div className="text-center mb-4">
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
            <Button
              type="submit"
              variant="outline-primary"
              className={`text-bold ${isButtonClicked ? "clicked" : ""}`}
            >
              Login
            </Button>
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

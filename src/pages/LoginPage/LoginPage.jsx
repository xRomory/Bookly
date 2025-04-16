import React, { useState } from "react";
import "./LoginPage.scss";

import { Link } from "react-router";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Updated Credentials:", credentials)
  };

  return (
    <div className="login-container">
      <div className="login-wrapper flex min-h-[100vh] justify-center w-[600px] items-center z-40 rounded-[0px_10px_10px_0] shadow-[0_1px_20px_rgb(0,0,0,1)]">
        <div className="logo-div absolute top-5 left-12 z-50">
          <Link to="/" className="logo flex">
            <h1 className="text-[2.2rem]">Bookly</h1>
          </Link>
        </div>

        <form className="w-[27vw]">
          <h1 className="text-5xl text-center font-bold">Login</h1>
          <div className="input-box">
            <h2 className="font-medium">Email</h2>
            <input
              type="email"
              name="email"
              className="mb-11"
              placeholder="example@email.com"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-box">
            <h2 className="mt-16 font-medium">Password</h2>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="remember-forgot mt-16 flex justify-between text-lg p-[0_.5rem]">
            <div className="remember-me flex gap-2">
              <input type="checkbox" className="w-4" /> Remember Me
            </div>
            <a href="#">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full h-12 border-none rounded-lg text-white font-bold mt-8 text-xl"
          >
            Sign In
          </button>

          <div className="register-link text-lg text-center m-5 font-thin">
            <span>Don't have an account? </span>
            <Link to="/sign-up">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

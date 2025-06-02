import React, { useState } from "react";
import "./LoginPage.scss";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Updated Credentials:", credentials)
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await login(credentials.email, credentials.password);

    if (!result.success) {
      setError(result.error || "Login failed");
    }

    if(result.success) {
      navigate("/");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper flex min-h-[100vh] justify-center w-[600px] items-center z-40 rounded-[0px_10px_10px_0] shadow-[0_1px_20px_rgb(0,0,0,1)]">
        <div className="logo-div absolute top-5 left-12 z-50">
          <Link to="/" className="logo flex">
            <h1 className="text-[2.2rem]">Bookly</h1>
          </Link>
        </div>

        <form onSubmit={handleLoginSubmit} className="w-[27vw]">
          <h1 className="text-5xl text-center font-bold">Login</h1>

          {error && <div className="text-red-600 font-quicksand text-center font-bold">{error}</div>}

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

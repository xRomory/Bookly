import React, { use, useState } from "react";
import "./SignupPage.scss";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password != formData.confirmPassword) {
      alert("Password do not match");
      setIsLoading(false);
      return;
    };

    try {
      await api.get("/users/csrf/token/");

      const response = await api.post("/users/register/", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        contact_number: formData.contactNumber,
        password: formData.password,
      });

      if(response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      setMessage("Registration Successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
      });

      if(response.status === 201) {
        console.log("Sign up successfully", formData);
      }

      window.location.href = "/"

    } catch(error) {
      if(error.response) {
        console.error("Error data:", error.response.data);
        setMessage(`Error: ${JSON.stringify(error.response.data)}`);
      } else if(error.request) {
        console.error("No response received:", error.request);
        setMessage("Network error - please try again");
      } else {
        console.error("Error registering: ", error);
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up-container grid grid-cols-2">
      <div className="wrapper relative min-h-[100vh] max-w-[700px] z-40 rounded-[0px_10px_10px_0] shadow-[0_1px_20px_rgb(0,0,0,1)] flex items-center justify-center">
        <div className="logo-div absolute top-[40%] left-[25%] z-50 text-center">
          <Link to="/" className="logo flex flex-col items-center">
            <h1 className="text-[5rem]">Bookly</h1>
          </Link>
          <p className="tagline-text text-white font-medium text-2xl">
            Book with Ease, Stay in Peace
          </p>
        </div>
      </div>

      <div className="create-account-container flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-[80%] max-w-[700px]">
          <h1 className="text-4xl font-bold text-center mb-8">
            Create an Account
          </h1>

          {message && <p className="font-quicksand font-medium">{message}</p>}

          <div className="create-acc-div grid grid-cols-2 gap-4">
            <div className="input-box">
              <h2 className="font-medium">First Name</h2>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter your First Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <h2 className="font-medium">Last Name</h2>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                required
              />
            </div>

            <div className="input-box">
              <h2 className="font-medium">Email</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="input-box">
              <h2 className="font-medium">Contact Number</h2>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your Contact Number"
                required
              />
            </div>
          </div>

          <div className="input-box">
            <h2 className="font-medium">Password</h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-box">
            <h2 className="mt-8 font-medium">Confirm Password</h2>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 border-none rounded-lg text-white font-bold mt-8 text-xl"
          >
            Sign Up
          </button>

          <div className="register-link text-lg text-center m-5 font-thin">
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

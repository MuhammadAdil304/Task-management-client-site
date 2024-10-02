import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURI } from "../constant";
import { useSelector } from "react-redux";

const Signup = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  
    if (isloggedIn === true) {
      navigate("/");
    }

  const handleChange = (key, val) => {
    setData({ ...data, [key]: val });
    console.log(data);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseURI}/sign-up`, data);
      setMessage(response.data.message);
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      setMessage("");
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="rounded p-4 w-3/6 bg-gray-800">
        <div className="text-2xl font-semibold ">Sign Up</div>
        <input
          type="username"
          placeholder="Username"
          name="username"
          className="bg-gray-700 p-2 my-3 w-full rounded"
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="bg-gray-700 p-2 my-3 w-full rounded"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="bg-gray-700 p-2 my-3 w-full rounded"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {error ? (
          <div className="text-red-950 bg-red-200 text-start my-3 p-2 rounded">
            {error}
          </div>
        ) : null}
        {message ? (
          <div className="text-green-950 bg-green-200 text-start my-3 p-2 rounded">
            {message}
          </div>
        ) : null}
        <div className="w-full flex flex-wrap justify-between items-center">
          <button
            className="px-3 py-2 rounded bg-blue-400 text-black font-semibold text-xl"
            onClick={handleSubmit}
          >
            SignUp
          </button>
          <Link
            to="/login"
            className="text-gray-400 hover:text-gray-200 transition-all duration-300"
          >
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURI } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isloggedIn === true) {
    navigate("/");
  }
  const handleChange = (key, val) => {
    setData({ ...data, [key]: val });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURI}/sign-in`, data);
      setMessage(response.data.message);
      localStorage.setItem("id", response?.data?.data?.user?._id);
      localStorage.setItem("token", response?.data?.data?.token);
      setLoading(false);
      dispatch(authActions.login());
      navigate("/");
      setError("");
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
      setMessage("");
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="rounded p-4 w-3/6 bg-gray-800">
        <div className="text-2xl font-semibold ">LogIn</div>
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
            onClick={handleSubmit}
            className="px-3 py-2 rounded bg-blue-400 text-black font-semibold text-xl"
          >
            {loading ? "please wait..." : "Login"}
          </button>
          <Link
            to="/signup"
            className="text-gray-400 hover:text-gray-200 transition-all duration-300"
          >
            Not having an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

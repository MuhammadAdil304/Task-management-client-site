import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { baseURI, headers } from "../constant";

const Inputdata = ({
  inputDiv,
  setInputDiv,
  tasks,
  setTasks,
  updatedData,
  setUpdatedData,
}) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const handleChange = (key, val) => {
    setData({ ...data, [key]: val });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURI}/create-task`, data, {
        headers,
      });
      console.log(response?.data);
      setMessage(response?.data?.message);
      setTasks([response?.data?.data, ...tasks]);
      setError(null);
      setLoading(false);
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
      setMessage(null);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      setMessage(null);
      setLoading(false);
      setData({ title: "", desc: "" });
      setError(null);
    }
  };
  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);
  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${baseURI}/update-task/${updatedData.id}`,
        data,
        { headers }
      );
      console.log(response?.data.data);
      setMessage(response?.data?.message);
      const updatedTasks = tasks.map((task) =>
        task._id === updatedData.id ? response?.data?.data : task
      );
      setTasks(updatedTasks);
      setError(null);
      setLoading(false);
      setUpdatedData({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
      setMessage(null);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      setMessage(null);
      setLoading(false);
      setData({ title: "", desc: "" });
      setError(null);
    }
  };
  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              className="text-xl"
              onClick={() => {
                setInputDiv("hidden");
                setUpdatedData({ id: "", title: "", desc: "" });
                setData({ title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter the title"
            name="title"
            className="bg-gray-700 px-3 py-2 rounded w-full my-3"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <textarea
            name="desc"
            placeholder="Enter the description..."
            className="bg-gray-700 px-3 py-2 rounded w-full my-3 "
            rows={10}
            value={data.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
          ></textarea>
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
          {updatedData.id === "" ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-black font-semibold text-xl px-3 py-2 rounded"
            >
              {loading ? "Please wait..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={handleUpdateTask}
              className="bg-blue-500 text-black font-semibold text-xl px-3 py-2 rounded"
            >
              {loading ? "Please wait..." : "Update"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Inputdata;

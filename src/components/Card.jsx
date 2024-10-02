import React from "react";
import { CiHeart } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { baseURI, headers } from "../constant";
import axios from "axios";

const Card = ({ home, setInputDiv, tasks, setTasks, setUpdatedData }) => {
  console.log(tasks);
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`${baseURI}/update-complete-task/${id}`, {}, { headers });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, complete: !task.complete } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `${baseURI}/update-important-task/${id}`,
        {},
        { headers }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, important: !task.important } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${baseURI}/delete-task/${id}`, { headers });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tasks &&
        tasks.map((x, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-between bg-gray-800 rounded-sm p-2"
            >
              <div>
                <h3 className="text-xl font-semibold">{x.title}</h3>
                <p className="text-gray-300 my-2">{x.desc}</p>
              </div>
              <div className="mt-4 w-full flex items-center">
                <button
                  onClick={() => handleCompleteTask(x._id)}
                  className={`${
                    x.complete ? "bg-green-700" : "bg-red-400"
                  } px-2 py-1 rounded w-3/6`}
                >
                  {x.complete ? "Completed" : "Incomplete"}
                </button>
                <div className="w-3/6 text-2xl flex justify-around">
                  <button onClick={() => handleImportantTask(x._id)}>
                    {x.important ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <CiHeart />
                    )}
                  </button>
                  {home !== 'false' && <button onClick={() => handleUpdate(x._id, x.title, x.desc)}>
                    <CiEdit />
                  </button>}
                  <button onClick={() => handleDeleteTask(x._id)}>
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-wrap flex-col justify-center items-center text-2xl text-gray-300 bg-gray-800 rounded-sm p-2 hover:cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <IoAddCircleSharp className="text-5xl" />
          <p className="text-2xl mt-4">Add Task</p>
        </button>
      )}
    </div>
  );
};

export default Card;

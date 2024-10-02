import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { IoAddCircleSharp } from "react-icons/io5";
import Inputdata from "../components/Inputdata";
import axios from "axios";
import { baseURI, headers } from "../constant";

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState();
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${baseURI}/get-all-tasks`, {
          headers,
        });
        setTasks(data?.data?.tasks);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);
  return (
    <>
      <div>
        <div className="w-full flex justify-end p-4">
          <button>
            <IoAddCircleSharp
              onClick={() => setInputDiv("fixed")}
              className="text-4xl text-gray-400 hover:text-gray-200 transition-all duration-300"
            />
          </button>
        </div>
        {tasks && (
          <Card
            home={"true"}
            setInputDiv={setInputDiv}
            tasks={tasks}
            setTasks={setTasks}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      {tasks && (
        <Inputdata
          inputDiv={inputDiv}
          setInputDiv={setInputDiv}
          tasks={tasks}
          setTasks={setTasks}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
        />
      )}
    </>
  );
};

export default AllTask;

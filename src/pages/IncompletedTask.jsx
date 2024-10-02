import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { baseURI, headers } from "../constant";


const IncompletedTask = () => {
  const [tasks, setTasks] = useState();
  const fetchIncompletedTasks = async () => {
    const { data } = await axios.get(`${baseURI}/get-incompleted-tasks`, {
      headers,
    });
    setTasks(data?.data);
  };
  useEffect(() => {
    fetchIncompletedTasks();
  }, []);
  return (
    <div>
       <Card home="false" tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}

export default IncompletedTask
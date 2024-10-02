import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { baseURI, headers } from "../constant";

const CompletedTask = () => {
  const [tasks, setTasks] = useState();
  const fetchCompletedTasks = async () => {
    const { data } = await axios.get(`${baseURI}/get-completed-tasks`, {
      headers,
    });
    setTasks(data?.data);
  };
  useEffect(() => {
    fetchCompletedTasks();
  }, []);
  return (
    <div>
      <Card home="false" tasks={tasks} setTasks={setTasks}/>
    </div>
  );
};

export default CompletedTask;

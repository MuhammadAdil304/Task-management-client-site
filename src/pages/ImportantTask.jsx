import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { baseURI, headers } from "../constant";

const ImportantTask = () => {
  const [tasks, setTasks] = useState();
  const fetchImportantTasks = async () => {
    const { data } = await axios.get(`${baseURI}/get-important-tasks`, {
      headers,
    });
    setTasks(data?.data)
  };
  useEffect(() => {
    fetchImportantTasks();
  }, []);
  return (
    <div>
      <Card home="false" tasks={tasks} setTasks={setTasks}/>
    </div>
  );
};

export default ImportantTask;

import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa6";
import { MdLabelImportantOutline } from "react-icons/md";
import { TbNotebookOff } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURI } from "../constant";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const data12 = [
    {
      title: "All data",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important data",
      icon: <MdLabelImportantOutline />,
      link: "importantTask",
    },
    {
      title: "Completed data",
      icon: <FaCheckDouble />,
      link: "completedTask",
    },
    {
      title: "Incompleted data",
      icon: <TbNotebookOff />,
      link: "incompletedTask",
    },
  ];
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/login");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${baseURI}/get-all-tasks`, { headers });
      setData(data?.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);
  return (
    <div className="flex flex-col h-full justify-between">
      {data && (
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{data.username}</h2>
          <h4 className="mb-1 text-gray-500">{data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data12.map((x, i) => (
          <Link
            to={x.link}
            className="my-2 flex items-center gap-2 p-2 rounded hover:bg-gray-500 transition-all duration-300 cursor-pointer"
            key={i}
          >
            {x.icon} {x.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-500 w-full p-2 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

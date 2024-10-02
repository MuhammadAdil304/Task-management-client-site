import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-[97vh] gap-4">
      <div className="w-1/6 border border-gray-500 rounded p-4">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-gray-500 rounded p-4 scroll-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

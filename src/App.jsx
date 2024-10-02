import "./App.css";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTask from "./pages/IncompletedTask";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-gray-900 text-white min-h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="/importantTask" element={<ImportantTask />} />
          <Route path="/completedTask" element={<CompletedTask />} />
          <Route path="/incompletedTask" element={<IncompletedTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

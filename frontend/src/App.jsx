import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={!authUser ? <Navigate to="/login" /> : <Home />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

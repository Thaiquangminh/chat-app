import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  //#region "State"
  const { loading, login } = useLogin();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [typePassword, setTypePassword] = useState("password");
  //#endregion

  //#region "Functions"
  const handleLogin = (e) => {
    login(loginForm);
    e.preventDefault();
  };

  const handleTogglePassword = () => {
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  };
  //#endregion

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>

        <form onSubmit={handleLogin}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>

            <div className="relative">
              <input
                type={typePassword}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
              <div
                onClick={handleTogglePassword}
                className="absolute cursor-pointer right-[5%] top-[50%] -translate-y-1/2"
              >
                {typePassword === "password" ? <BsEyeSlash /> : <BsEye />}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>

            <Link
              to="/forgot-password"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center mt-4 min-h-[32px]">
            {!loading ? (
              <button className="btn btn-block btn-sm">Login</button>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

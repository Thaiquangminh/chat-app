import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import GenderCheckbox from "./GenderCheckbox.jsx";
import useSignUp from "../../hooks/useSignup.js";

const Signup = () => {
  //#region "Component State"
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signupStatus, signup } = useSignUp();
  const navigate = useNavigate();

  //#endregion

  //#region "Functions"
  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  useEffect(() => {
    if (signupStatus === 200) {
      navigate("/login");
    }
  }, [signupStatus, navigate]);

  const handleChangeGender = (gender) => {
    setFormData({ ...formData, gender: gender });
  };
  //#endregion

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
        </h1>

        <form onSubmit={handleSignUp}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              className="w-full input input-bordered  h-10"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onChangeCheckBox={handleChangeGender}
            gender={formData.gender}
          />

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div className="flex justify-center mt-4 min-h-[32px]">
            {!loading ? (
              <button className="btn btn-block btn-sm border border-slate-700">
                Sign Up
              </button>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

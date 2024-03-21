import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  //#region "Component State"
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
  });
  const [typePassword, setTypePassword] = useState("password");
  const [currentStep, setCurrentStep] = useState("username");
  const {
    loadingCheckUsername,
    checkUsername,
    loadingChangPassword,
    changePassword,
  } = useForgotPassword();
  //#endregion

  //#region "Functions"
  const handleNextStep = async (e) => {
    e.preventDefault();
    const data = await checkUsername(formData.username);
    if (data.statusCode === 200) {
      setCurrentStep("password");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const data = await changePassword(formData);
    if (data.statusCode === 200) {
      navigate("/login");
    }
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
          Forgot Password
        </h1>

        {currentStep === "username" ? (
          <form>
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

            <div className="flex justify-center mt-4 min-h-[32px]">
              {!loadingCheckUsername ? (
                <button
                  className="btn btn-block btn-sm border border-slate-700"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </div>
          </form>
        ) : (
          <form>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={typePassword}
                  placeholder="Enter New Password"
                  className="w-full input input-bordered h-10"
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
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

            <div className="flex justify-center mt-4 min-h-[32px]">
              {!loadingChangPassword ? (
                <button
                  className="btn btn-block btn-sm border border-slate-700"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

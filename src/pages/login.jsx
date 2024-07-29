import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../config/request";
import { saveState } from "../config/storage";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../components/user-login";

export const Login = () => {
  const navigate = useNavigate();
  const [open, setOPen] = React.useState(false);
  const { handleSubmit, register, reset } = useForm();

  const registerUser = (data) => {
    request
      .post("/register", data)
      .then((res) => {
        if (res.data) {
          saveState("user", {
            accessToken: res.data.accessToken,
            ...res.data.user,
          });
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {open ? (
        <>
          <UserLogin />
        </>
      ) : (
        <div className="flex-row items-center mx-[800px]">
          <h1 className="text-4xl text-black font-bold text-center mb-6">
            Register
          </h1>
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit(registerUser)}
              className="relative my-4"
            >
              <div className="relative my-4 mx-4 py-4">
                <input
                  {...register("name")}
                  placeholder="name"
                  type="name"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2"
                />
                <label className="absolute text-sm text-black ">
                  Your name
                </label>
              </div>
              <div className="relative my-4 mx-4 py-4">
                <input
                  {...register("email")}
                  placeholder="email"
                  type="email"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2"
                />
                <label className="absolute text-sm text-black ">
                  Your email
                </label>
              </div>

              <div className="relative my-4 mx-4 py-4">
                <input
                  {...register("password")}
                  placeholder="password"
                  type="password"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0"
                />
                <label className="absolute text-sm text-black ">Password</label>
              </div>
              <button type="submit">send</button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setOPen(!open)}
        className="p-1 border-blue-700 border-1 mx-[800px]"
      >
        {open ? "Register" : "Login"}
      </button>
    </>
  );
};

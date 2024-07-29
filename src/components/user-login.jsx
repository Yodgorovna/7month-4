import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from "../config/request";
import { saveState } from "../config/storage";

export const UserLogin = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const submit = (data) => {
    request
      .post("/login", data)
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
    <div className="flex">
      <h1 className="text-4xl text-black font-bold text-center mb-6">login</h1>
      <div className="flex items-center">
        <form onSubmit={handleSubmit(submit)} className="relative my-4">
          <div className="relative my-4 mx-4 py-4">
            <input
              {...register("email")}
              placeholder="email"
              type="email"
              className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2"
            />
            <label className="absolute text-sm text-black ">Your email</label>
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
  );
};

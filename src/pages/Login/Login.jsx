// import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post("http://localhost:5000/login", data)
      .then(({ data }) => console.log(data))
      .catch((error) =>
        Swal.fire({
          title: error.response.data,
          // text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Retry",
          showClass: {
            popup: `
              animate__animated
              animate__bounceIn
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__bounceOut
            `,
          },
        })
      );
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="shadow-lg p-5 rounded-xl xl:w-1/3"
        onSubmit={handleLogin}
      >
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-3xl font-bold">Login</h3>

          <p className="text-base">
            {"Don't"} have an account?{" "}
            <Link
              className="underline text-blue-700 hover:text-blue-900"
              to={"/register"}
            >
              Create a New One
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            required
            name="email"
            placeholder="Enter your email address"
            className="w-full border px-4 py-2 focus:outline-none"
          />
          <div className="relative h-full">
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              placeholder="Enter your password"
              className="w-full border px-4 py-2 focus:outline-none"
            />

            <label className="cursor-pointer absolute top-0 bottom-0 right-4 ml-auto my-auto flex items-center justify-center text-xl">
              {showPassword ? <TbEye /> : <TbEyeClosed />}
              <input
                type="checkbox"
                className="hidden"
                onChange={(e) => setShowPassword(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="text-center mt-6">
          <input
            type="submit"
            value={"Submit"}
            className="mt-8 bg-blue-700 w-full text-white py-3 rounded cursor-pointer hover:bg-blue-800 transition"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

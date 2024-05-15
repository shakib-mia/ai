// import React from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target.email.value);
    if (e.target.password.value === e.target["confirm-password"].value) {
      axios
        .post("http://localhost:5000/register", {
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then(({ data }) => console.log(data));
    } else {
      alert("Password didn't match");
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="shadow-lg p-5 rounded-xl xl:w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl font-bold mb-3">Register</h3>

          <p className="text-base mb-3">
            Already have an account?{" "}
            <Link
              className="underline text-blue-700 hover:text-blue-900"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-full border px-4 py-2"
          name="email"
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border px-4 py-2"
          name="password"
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Confirm your password"
          className="w-full border px-4 py-2"
          name="confirm-password"
          required
        />

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

export default Register;

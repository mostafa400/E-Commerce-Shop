import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../UseLocalStorage";

function SignUp() {
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    let userData = { email, password };

    localStorage.setItem("userData", JSON.stringify(userData));

    setSuccess("Sign up successful!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <section className="bg-slate-100 min-h-screen ">
      <div className="relative scroll-hidden ">
        <img
          className="h-60 w-full object-cover"
          src="../public/images/table.jpg"
          alt="shop"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Sign Up</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8  ">
        <div className="flex flex-col rounded-lg shadow-lg font-semibold p-6 gap-5 bg-white">
          <div className="  p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-gray-700 text-center">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
                <div className="mt-2">
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    w-full"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </label>

              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
                <div className="mt-2">
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    w-full"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
                <div className="mt-2">
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    w-full"
                    type="password"
                    name="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </label>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-red-500">{success}</p>}
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg">
                Sign Up
              </button>
              <div className="flex gap-3">
                <p>Already have an account?</p>
                <Link
                  className="font-medium text-blue-600 hover:text-blue-500"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;

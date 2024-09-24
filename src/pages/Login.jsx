import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../UseLocalStorage";

function Login() {
  const [storedEmail] = useLocalStorage("email", "");
  const [storedPassword] = useLocalStorage("password", "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [sucess, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // verfication steps
    if (!email || !password) {
      setError("Email and password cannot be empty");
      setSuccess("");
      return;
    }

    if (email === storedEmail && password === storedPassword) {
      setSuccess("Redirecting");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } else {
      setError("Invalid email or password");
      setSuccess("");
    }
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-100">
      <div className="relative h-60 scroll-hidden">
        <img
          className="h-full w-full object-cover"
          src="Images/table.jpg"
          alt="Logout"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Login</h1>
        </div>
      </div>
      <div className="flex flex-grow items-center justify-center px-6 py-8 ">
        <div className="flex flex-col rounded-lg shadow-lg font-semibold p-6 gap-5 bg-white mt-5">
          <div className="  p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 ">
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Email
                <div className="mt-2">
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    w-full"
                    type="email"
                    name="email"
                    required
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>
              {error && <p className="text-red-500">{error}</p>}
              {sucess && <p className="text-green-500">{sucess}</p>}
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg">
                Login
              </button>
              <p className="text-l text-gray-600">
                Dont have an account?{" "}
                <Link
                  className="font-medium text-blue-600 hover:text-blue-500"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

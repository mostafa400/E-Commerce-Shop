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
    <section className="bg-slate-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen ">
        <div className="flex flex-col rounded-lg shadow font-semibold p-6 gap-5 bg-white">
          <div className="  p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-gray-700 ">Create an account</h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
                <div className="mt-2">
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
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
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
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
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
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

              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;

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

    if (email === storedEmail && password === storedPassword) {
      setSuccess("Redirecting");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError("Invalid email or password");
      setSuccess("");
    }
  };
  return (
    <section className="bg-slate-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen ">
        <div className="flex flex-col rounded-lg shadow font-semibold p-6 gap-5 bg-white">
          <div className="  p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-gray-700 ">Login</h1>
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
              {error && <p className="text-red-500">{error}</p>}
              {sucess && <p className="text-green-500">{sucess}</p>}
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg">
                Login
              </button>
              <p>
                Dont have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

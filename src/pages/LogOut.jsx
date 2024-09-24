import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  // to remove the data in the local storage and show that he is logging out
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    setLoggingOut(true);

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
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
          <h1 className="text-white text-4xl font-bold">Logout</h1>
        </div>
      </div>
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              Log out
            </button>
            <Link to="/">
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300">
                Cancel
              </button>
            </Link>
          </div>
          {loggingOut && (
            <p className="text-center text-red-600 mt-4">Logging you out...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LogOut;

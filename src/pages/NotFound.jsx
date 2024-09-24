import React from "react";

function NotFound() {
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
          <h1 className="text-white text-4xl font-bold">Page Not found</h1>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

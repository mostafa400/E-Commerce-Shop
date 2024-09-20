import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
	return (
		<div>
			<Navbar />
			<main className="mt-[73px] md:mt-[65px] w-full h-full">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default Layout;

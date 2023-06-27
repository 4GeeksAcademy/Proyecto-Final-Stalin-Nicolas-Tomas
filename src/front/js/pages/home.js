import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store,} = useContext(Context);

	return (
		<div className="text-center mt-3">
		  <div className="pb-2">
			<a className="btn btn-success m-2" href="/signup" role="button">Signup</a>
			<a className="btn btn-primary m-2" href="/login" role="button">Login</a>
		  </div>
		  <div className="alert alert-info">
			{store.message ||
			  "Loading message from the backend (make sure your python backend is running)..."}
		  </div>
		  <p>
			This boilerplate comes with lots of documentation:{" "}
			<a href="https://start.4geeksacademy.com/starters/react-flask">
			  Read documentation
			</a>
		  </p>
		</div>
	  );
	};
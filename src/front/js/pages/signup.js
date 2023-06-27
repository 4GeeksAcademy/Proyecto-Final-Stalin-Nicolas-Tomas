import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Signup = () => {
  const { store } = useContext(Context);

  const [inputVal, setInputVal] = useState({});

  const navigate = useNavigate();

  // control the variables email and password
  const handleChange = (e) => {
    setInputVal({
        ...inputVal,
        [e.target.id]: e.target.value
    })
  }

  // submit the new 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupUrl = store.apiUrl + "signup"

    const requestNewUser = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputVal.email,
          password: inputVal.password,
        }),
      };

    const resp = await fetch(signupUrl, requestNewUser).catch(() => false);

    if (!resp) return window.alert("There's been a problem with the request");

    window.alert("User created");
    navigate("/login")

  }

  return (
    <section className="h-100 gradient-form" style={{"backgroundColor": "#eee"}}>
        <div className="container py-3 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-8">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-10 mx-auto">
                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="text-center">
                                        <h4 className="mt-1 mb-5 pb-1">Signup</h4>
                                    </div>

                                    <form name="signup" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="form-control" 
                                                placeholder="Insert new email"
                                                onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <input 
                                                type="password" 
                                                id="password" 
                                                className="form-control" 
                                                placeholder="Insert new password"
                                                onChange={handleChange} />
                                        </div>

                                        <div className="text-center pt-1 mb-5 pb-1">
                                            <button className="btn btn-primary btn-lg gradient-custom-2 m-2" type="submit">Register</button>
                                            <Link to={'/login'}><span className="btn btn-outline-danger btn-lg">Login</span></Link>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
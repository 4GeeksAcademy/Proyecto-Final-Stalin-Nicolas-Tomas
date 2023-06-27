import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate()

    const [authState, setAuthState] = useState({
        user: null,
        userAuth: false,
        loading: true
    })

    const checkUser = async (token) => {
        const checkApiUrl = store.apiUrl + "private";

        const requestAuth = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await fetch(checkApiUrl, requestAuth);
        const respJson = await response.json();

        let auth = {
            check: false,
            user: null,
            msg: ""
        }

        if (!response || !response.ok) auth.msg = respJson.msg;
        else {
            auth.check = true;
            auth.user = respJson.logged_in_as;
            auth.msg = "User successfully authenticated"
        }

        return auth
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        const userAuth = async () => {
            const checkIn = await checkUser(token);

            if(!checkIn.check) setAuthState(prev => ({...prev, loading: false}));
            else {
                setAuthState((prev) => ({
                        ...prev,
                        user: checkIn.user,
                        userAuth: true,
                        loading: false
                })
            )}
        }

        userAuth()

    }, []);


    console.log(authState)
    if (!authState.userAuth && authState.loading) return <h1>... loading</h1>;
    if (!authState.userAuth && !authState.loading) {
        window.alert("Login again")
        navigate("/login");
    }

    return (
        <section className="h-100 gradient-form" style={{"backgroundColor": "#eee"}}>
            <div>
                <h1>You made it!</h1>
            </div>
        </section>
    );
};
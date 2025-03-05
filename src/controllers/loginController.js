import MainView from "../views/mainView.js";
import {RegisterController} from "./RegisterController";

export function LoginController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = MainView("login");

    // Handle login form submission
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            window.location.href = "/customer";
        } else {
            alert("Invalid Email or Password!");
        }
    });

    document.getElementById("registerLink").addEventListener("click", (event) => {
        event.preventDefault();
        RegisterController();
    });

}

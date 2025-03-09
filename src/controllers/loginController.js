import MainView from "../views/mainView.js";
import {RegisterController} from "./RegisterController";

export function LoginController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = MainView("login");

    // Handle login form submission
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.status === 200) {
                window.location.href = "/dashboard";
            } else {
                alert(data.Error || "Invalid Username or Password!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing your request.");
        }
    });


    document.getElementById("registerLink").addEventListener("click", (event) => {
        event.preventDefault();
        RegisterController();
    });

}

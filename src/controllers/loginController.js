import MainView from "../views/mainView.js";

export function LoginController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = MainView("login");

    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulate authentication
        if (username === "admin" && password === "1234") {

            window.location.href = "/customer";
        } else {
            alert("Invalid Email or Password!");
        }
    });
}

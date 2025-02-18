import MainView from "../views/mainView.js";

export function LoginController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = MainView("login");

    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Simulate authentication
        if (email === "admin@example.com" && password === "admin123") {
            alert("Login Successful!");
            window.location.href = "/dashboard";
        } else {
            alert("Invalid Email or Password!");
        }
    });
}

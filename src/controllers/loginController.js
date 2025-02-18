import LoginView from "../views/loginView.js";

export function LoginController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = LoginView();

    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "admin@example.com" && password === "admin123") {
            alert("Login Successful!");
            window.location.href = "/dashboard";
        } else {
            alert("Invalid Email or Password!");
        }
    });
}

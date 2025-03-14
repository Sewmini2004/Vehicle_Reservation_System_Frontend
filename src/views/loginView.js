import {InputField} from "../components/form.js";


export function LoginForm() {
    return `
        <h2 class="text-center fw-bold">Log in</h2>
        <form id="loginForm">
            ${InputField("username", "text", "Enter your username", "Username", "fas fa-user")}
            ${InputField("password", "password", "Enter your password", "Password", "fas fa-lock")}

            <div class="text-end">

            </div>
            <button type="submit" class="btn btn-success w-100 mt-3">Login</button>

            <div class="text-center mt-3">
                <span>Don't have an account?</span>
                <a href="/register"  id="registerLink" class="text-primary" data-link>Register</a>
            </div>
        </form>
    `;
}

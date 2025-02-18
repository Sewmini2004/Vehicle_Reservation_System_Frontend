import InputField from "../components/form.js";

export default function LoginView() {
    return `
        <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div class="card p-4 shadow" style="width: 350px;">
                <h2 class="text-center">Login</h2>
                <form id="loginForm">
                    ${InputField("email", "email", "Enter your email", "Email")}
                    ${InputField("password", "password", "Enter your password", "Password")}

                    <div class="text-end">
                        <a href="/forgot-password" class="text-decoration-none" data-link>Forgot Password?</a>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mt-3">Login</button>

                    <div class="text-center mt-3">
                        <span>Don't have an account?</span>
                        <a href="/signup" class="text-primary" data-link>Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    `;
}

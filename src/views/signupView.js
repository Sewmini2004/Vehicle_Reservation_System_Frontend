import {InputField} from "../components/form";

export function SignupForm() {
    return `
        <h2 class="text-center">Register Here</h2>
        <form id="signupForm">
            ${InputField("username", "text", "Choose a username", "Username")}
            ${InputField("email", "email", "Enter your email", "Email")}
            ${InputField("password", "password", "Create a password", "Password")}
            ${InputField("confirmPassword", "password", "Confirm your password", "Confirm Password")}

            <button type="submit" class="btn btn-success w-100 mt-3">Register</button>

            <div class="text-center mt-3">
                <span>Already have an account?</span>
                <a href="/login" class="text-primary" data-link>Login</a>
            </div>
        </form>
    `;
}

import {LoginForm} from "./loginView";
import {SignupForm} from "./signupView";

export default function MainView(page) {
    let formHtml = "";

    if (page === "login") {
        formHtml = LoginForm();
    } else if (page === "signup") {
        formHtml = SignupForm();
    }

    return `
        <div class="login-container d-flex justify-content-center align-items-center vh-100">
            <div class="row w-100 justify-content-center">
                
            
                <!-- Login / Signup Form -->
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <div class="login-card p-5 shadow-lg">
                        ${formHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

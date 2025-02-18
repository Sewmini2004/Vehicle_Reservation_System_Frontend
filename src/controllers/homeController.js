// controllers/homeController.js
export function HomeController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = `
        <div class="text-center">
            <h1>Welcome to the Home Page!</h1>
            <a href="/login" data-link class="btn btn-primary mt-3">Go to Login</a>
        </div>
    `;
}

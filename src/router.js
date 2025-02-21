// router.js
import { LoginController } from "./controllers/loginController.js";
import { CustomerController } from "./controllers/customerController.js";
import { DriverController } from "./controllers/DriverController.js";
import { VehicleController } from "./controllers/VehicleController.js";

const routes = {
    "/": LoginController,
    "/login": LoginController,
    "/customer": CustomerController,
    "/driver": DriverController,
    "/vehicle": VehicleController,
};

// Function to handle navigation
export function navigateTo(url) {
    history.pushState(null, null, url); // Update the URL without reloading the page
    renderRoute(url); // Render the correct route
}

// Function to render the correct route
export function renderRoute(url) {
    const pageController = routes[url] || (() => document.getElementById("app").innerHTML = "<h1>404 - Not Found</h1>");
    pageController(); // Call the appropriate controller function
}

// Handle back/forward navigation
window.addEventListener("popstate", () => renderRoute(location.pathname));

document.addEventListener("DOMContentLoaded", () => {
    // Listen for clicks on elements with the data-link attribute
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) { // Handle links with data-link attribute
            e.preventDefault(); // Prevent default behavior for links
            navigateTo(e.target.getAttribute('href')); // Trigger route change
        }
    });
    renderRoute(location.pathname); // Render initial route
});

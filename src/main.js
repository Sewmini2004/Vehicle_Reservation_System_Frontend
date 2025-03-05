import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { navigateTo, renderRoute } from './router.js';

// Function to handle sidebar visibility
function handleSidebarVisibility() {
    const sidebar = document.querySelector(".sidebar");
    const mainPanel = document.querySelector(".main-panel");

    // Hide sidebar for login and register pages
    if (window.location.pathname === "/register" || window.location.pathname === "/login") {
        if (sidebar) sidebar.style.display = "none";
        if (mainPanel) mainPanel.style.marginLeft = "0"; // Reset main panel layout
    } else {
        if (sidebar) sidebar.style.display = "block";
        if (mainPanel) mainPanel.style.marginLeft = "250px"; // Restore default layout
    }
}

// Initialize the router with the current route and adjust sidebar
document.addEventListener("DOMContentLoaded", () => {
    renderRoute(location.pathname);
    handleSidebarVisibility();
});

// Listen for back/forward navigation and update sidebar
window.addEventListener("popstate", () => {
    renderRoute(location.pathname);
    handleSidebarVisibility();
});

// Handle navigation clicks on elements with the `data-link` attribute
document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.getAttribute('href'));
        handleSidebarVisibility();
    }
});

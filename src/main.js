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


// Show profile section when profile image is clicked
document.getElementById("profileImg").addEventListener("click", () => {
    const profileSection = document.querySelector(".profile-section");
    // Toggle the visibility of the profile section
    profileSection.style.display = profileSection.style.display === "block" ? "none" : "block";
});


// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
    // Clear session storage or cookies related to the session
    sessionStorage.removeItem("adminSession");  // or clear specific session data

    // Redirect to the login page
    window.location.href = "/login";  // Adjust to your login page URL
});

// Load Admin name and role dynamically from sessionStorage (if available)
document.addEventListener("DOMContentLoaded", () => {
    const adminName = sessionStorage.getItem("adminName");
    const adminRole = sessionStorage.getItem("adminRole");

    if (adminName && adminRole) {
        document.getElementById("adminName").textContent = adminName;
        document.getElementById("adminRole").textContent = adminRole;
    }
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

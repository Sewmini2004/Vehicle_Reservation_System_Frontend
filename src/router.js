import { LoginController } from "./controllers/loginController.js";
import { CustomerController } from "./controllers/customerController.js";
import {DriverController} from "./controllers/DriverController";

const routes = {
    "/": LoginController,
    "/login": LoginController,
    "/customer": CustomerController,
    "/driver": DriverController,
    "/vehicle": VehicleController
};

export function navigateTo(url) {
    history.pushState(null, null, url);
    renderRoute(url);
}

export function renderRoute(url) {
    const pageController = routes[url] || (() => document.getElementById("app").innerHTML = "<h1>404 - Not Found</h1>");
    pageController();
}

window.addEventListener("popstate", () => renderRoute(location.pathname));

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    renderRoute(location.pathname);
});

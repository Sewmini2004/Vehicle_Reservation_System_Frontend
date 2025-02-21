// main.js
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { navigateTo, renderRoute } from './router.js';

// Initial HTML structure for the app (optional)
document.querySelector('#app').innerHTML = `
  <h1>Vehicle Reservation System</h1>
  <nav>
    <ul>
      <li><a href="/customer" data-link>Customer Management</a></li>
      <li><a href="/driver" data-link>Driver Management</a></li>
      <li><a href="/vehicle" data-link>Vehicle Management</a></li>
      <li><a href="/login" data-link>Login</a></li>
    </ul>
  </nav>
`;

// Initialize the router with the current route
renderRoute(location.pathname);

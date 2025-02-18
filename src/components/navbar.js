export default function Navbar() {
    return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="/" data-link>Vehicle Reservation</a>
                <div>
                    <a href="/" class="btn btn-light" data-link>Home</a>
                    <a href="/about" class="btn btn-light" data-link>About</a>
                    <a href="/dashboard" class="btn btn-warning" data-link>Dashboard</a>
                    <a href="/login" class="btn btn-danger" data-link>Login</a>
                </div>
            </div>
        </nav>
    `;
}

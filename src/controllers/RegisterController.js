import RegisterView from "../views/RegisterView.js";

export function RegisterController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = RegisterView();

    setTimeout(() => {
        const sidebar = document.querySelector(".sidebar");
        const mainPanel = document.querySelector(".main-panel");
        if (sidebar) sidebar.style.display = "none";
        if (mainPanel) mainPanel.style.marginLeft = "0";
    }, 0);
    document.getElementById("registerUserBtn").addEventListener("click", () => {
        console.log("Opening User Registration Modal");
        document.getElementById("userModalLabel").innerText = "Register User";
        document.getElementById("userForm").reset();
        document.getElementById("userId").value = "";
        new bootstrap.Modal(document.getElementById("userModal")).show();
    });

    // Save User
    document.getElementById("saveUserBtn").addEventListener("click", async () => {
        const userId = document.getElementById("userId").value;
        const user = {
            userId: userId ? parseInt(userId) : 0,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
        };

        try {
            let response;
            if (userId) {
                // Update existing user
                response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/register?userId=${userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
            } else {
                // Register new user
                response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
            }

            const result = await response.json();
            if (response.ok) {
                alert("User registered successfully!");
                bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
                window.location.href = "/login";
            } else {
                alert(`Failed to register user: ${result.message}`);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while saving data.");
        }
    });
}

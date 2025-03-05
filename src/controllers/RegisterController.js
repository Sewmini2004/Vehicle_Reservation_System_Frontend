import UserView from "../views/RegisterView.js";

export function RegisterController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = UserView(); // Load User Registration View

    // Open modal for adding a new user
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
            userId: userId ? parseInt(userId) : null,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            first_name: document.getElementById("firstName").value,
            last_name: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
        };

        try {
            let response;
            if (userId) {
                // Update existing user
                response = await fetch(`http://localhost:8091/api/user?userId=${userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
            } else {
                // Register new user
                response = await fetch("http://localhost:8091/api/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
            }

            const result = await response.json();
            if (response.ok) {
                alert("User registered successfully!");
                bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
            } else {
                alert(`Failed to register user: ${result.message}`);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while saving data.");
        }
    });
}

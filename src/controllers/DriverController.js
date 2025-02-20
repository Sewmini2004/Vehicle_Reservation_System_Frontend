import DriverView from "../views/DriverView";

export function DriverController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = DriverView();  // Load driver view
    loadDrivers();  // Fetch and display driver data

    // Open modal for adding a new driver
    document.getElementById("addDriverBtn").addEventListener("click", () => {
        console.log("Opening Add Driver Modal");
        document.getElementById("driverModalLabel").innerText = "Add Driver";
        document.getElementById("driverForm").reset();
        document.getElementById("driverId").value = "";
        new bootstrap.Modal(document.getElementById("driverModal")).show();
    });

    // Save or Update Driver
    document.getElementById("saveDriverBtn").addEventListener("click", async () => {
        const driverId = document.getElementById("driverId").value;
        const driver = {
            driverId: driverId,
            name: document.getElementById("name").value,
            licenseNumber: document.getElementById("licenseNumber").value,
            status: document.getElementById("status").value,
            shiftTiming: document.getElementById("shiftTiming").value,
            salary: document.getElementById("salary").value,
            experienceYears: document.getElementById("experienceYears").value,
            phoneNumber: document.getElementById("phoneNumber").value,
        };

        try {
            let response;
            if (driverId) {
                // Update existing driver
                response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver?driverId=${driverId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(driver),
                });
            } else {
                // Add new driver
                response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(driver),
                });
            }

            const result = await response.json();
            if (response.ok) {
                alert("Driver data saved successfully!");
                loadDrivers();  // Refresh driver table
                bootstrap.Modal.getInstance(document.getElementById("driverModal")).hide();  // Close modal
            } else {
                alert(`Failed to save driver data: ${result.message}`);
            }
        } catch (error) {
            console.error("Error saving driver:", error);
            alert("An error occurred while saving data.");
        }
    });
}

// Load drivers dynamically
window.loadDrivers = async function loadDrivers() {
    console.log("Loading driver data...");
    try {
        const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver");

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the JSON data
        const drivers = await response.json();  // Parse the JSON response

        console.log("Drivers fetched successfully:");
        console.log(drivers);

        const tableBody = document.getElementById("driverTableBody");
        tableBody.innerHTML = "";  // Clear previous data

        drivers.forEach(driver => {
            let editBtn = '';
            let deleteBtn = '';

            editBtn = `<a href="javascript:void(0)" id="edit" class="btn btn-warning btn-sm edit-btn" title="Edit" onclick="editDriver(${driver.driverId})" data-bs-toggle="modal"><i class="fa fa-edit"></i></a>`;
            deleteBtn = `<a href="javascript:void(0)" id="delete" class="btn btn-danger btn-sm delete-btn" onclick="deleteDriver(${driver.driverId})" title="delete"><i class="fa fa-trash"></i></a>`;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.licenseNumber}</td>
                <td>${driver.status}</td>
                <td>${driver.shiftTiming}</td>
                <td>${driver.salary}</td>
                <td>${driver.experienceYears}</td>
                <td>${driver.phoneNumber}</td>
                <td class="table-border-right">
                    <center>
                        ${editBtn}
                        ${deleteBtn}
                    </center>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading drivers:", error);
        alert("An error occurred while loading driver data.");
    }
}

// Edit driver
window.editDriver = async function editDriver(id) {
    console.log("Editing driver with ID:", id);
    try {
        // Fetch the specific driver by ID
        const response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver?driverId=${id}`);

        // Parse the JSON response
        const driver = await response.json();
        console.log("Fetched driver data: ");
        console.log(driver);

        // Populate the form with the driver data
        document.getElementById("driverId").value = driver.driverId;
        document.getElementById("name").value = driver.name;
        document.getElementById("licenseNumber").value = driver.licenseNumber;
        document.getElementById("status").value = driver.status;
        document.getElementById("shiftTiming").value = driver.shiftTiming;
        document.getElementById("salary").value = driver.salary;
        document.getElementById("experienceYears").value = driver.experienceYears;
        document.getElementById("phoneNumber").value = driver.phoneNumber;

        // Update modal label to "Edit Driver"
        document.getElementById("driverModalLabel").innerText = "Edit Driver";

        // Show the modal
        new bootstrap.Modal(document.getElementById("driverModal")).show();
    } catch (error) {
        console.error("Error fetching driver data for edit:", error);
        alert("Failed to load driver data for editing.");
    }
}

// Delete driver
window.deleteDriver = async function deleteDriver(id) {
    const confirmDelete = confirm("Are you sure you want to delete this driver?");
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver?driverId=${id}`, { method: "DELETE" });
            const result = await response.json();
            if (response.ok) {
                alert("Driver deleted successfully!");
                loadDrivers();  // Refresh table after deletion
            } else {
                alert(`Failed to delete driver: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting driver:", error);
            alert("An error occurred while deleting data.");
        }
    }
}

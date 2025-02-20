import VehicleView from "../views/VehicleView";

export function VehicleController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = VehicleView();  // Load vehicle view
    loadVehicles();  // Fetch and display vehicle data

    // Open modal for adding a new vehicle
    document.getElementById("addVehicleBtn").addEventListener("click", () => {
        console.log("Opening Add Vehicle Modal");
        document.getElementById("vehicleModalLabel").innerText = "Add Vehicle";
        document.getElementById("vehicleForm").reset();
        document.getElementById("vehicleId").value = "";
        new bootstrap.Modal(document.getElementById("vehicleModal")).show();
    });

    // Save or Update Vehicle
    document.getElementById("saveVehicleBtn").addEventListener("click", async () => {
        const vehicleId = document.getElementById("vehicleId").value;
        const vehicle = {
            vehicleId: vehicleId,
            carType: document.getElementById("carType").value,
            model: document.getElementById("model").value,
            availabilityStatus: document.getElementById("availabilityStatus").value,
            registrationNumber: document.getElementById("registrationNumber").value,
            fuelType: document.getElementById("fuelType").value,
            carModel: document.getElementById("carModel").value,
            seatingCapacity: document.getElementById("seatingCapacity").value,
        };

        try {
            let response;
            if (vehicleId) {
                // Update existing vehicle
                response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle?vehicleId=${vehicleId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vehicle),
                });
            } else {
                // Add new vehicle
                response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vehicle),
                });
            }

            const result = await response.json();
            if (response.ok) {
                alert("Vehicle data saved successfully!");
                loadVehicles();  // Refresh vehicle table
                bootstrap.Modal.getInstance(document.getElementById("vehicleModal")).hide();  // Close modal
            } else {
                alert(`Failed to save vehicle data: ${result.message}`);
            }
        } catch (error) {
            console.error("Error saving vehicle:", error);
            alert("An error occurred while saving data.");
            setTimeout(() => {
                loadVehicles();  // Calling loadVehicles again to reload the table data.
            }, 1000);
        }
    });
}

// Load vehicles dynamically
window.loadVehicles = async function loadVehicles() {
    console.log("Loading vehicle data...");
    try {
        const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle");

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the JSON data
        const vehicles = await response.json();  // Parse the JSON response

        console.log("Vehicles fetched successfully:");
        console.log(vehicles);
        const tableBody = document.getElementById("vehicleTableBody");
        tableBody.innerHTML = "";  // Clear previous data

        vehicles.forEach(vehicle => {
            let editBtn = '';
            let deleteBtn = '';

            editBtn = `<a href="javascript:void(0)" class="btn btn-warning btn-sm edit-btn" title="Edit" onclick="editVehicle(${vehicle.vehicleId})" data-bs-toggle="modal"><i class="fa fa-edit"></i></a>`;
            deleteBtn = `<a href="javascript:void(0)" class="btn btn-danger btn-sm delete-btn" onclick="deleteVehicle(${vehicle.vehicleId})" title="delete"><i class="fa fa-trash"></i></a>`;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${vehicle.carType}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.availabilityStatus}</td>
                <td>${vehicle.registrationNumber}</td>
                <td>${vehicle.fuelType}</td>
                <td>${vehicle.carModel}</td>
                <td>${vehicle.seatingCapacity}</td>
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
        console.error("Error loading vehicles:", error);
        alert("An error occurred while loading vehicle data.");
    }
}

// Edit vehicle
window.editVehicle = async function editVehicle(id) {
    console.log("Editing vehicle with ID:", id);
    try {
        // Fetch the specific vehicle by ID
        const response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle?vehicleId=${id}`);

        // Parse the JSON response
        const vehicle = await response.json();
        console.log("Fetched vehicle data: ");
        console.log(vehicle);

        // Populate the form with the vehicle data
        document.getElementById("vehicleId").value = vehicle.vehicleId;
        document.getElementById("carType").value = vehicle.carType;
        document.getElementById("model").value = vehicle.model;
        document.getElementById("availabilityStatus").value = vehicle.availabilityStatus;
        document.getElementById("registrationNumber").value = vehicle.registrationNumber;
        document.getElementById("fuelType").value = vehicle.fuelType;
        document.getElementById("carModel").value = vehicle.carModel;
        document.getElementById("seatingCapacity").value = vehicle.seatingCapacity;

        // Update modal label to "Edit Vehicle"
        document.getElementById("vehicleModalLabel").innerText = "Edit Vehicle";

        // Show the modal
        new bootstrap.Modal(document.getElementById("vehicleModal")).show();
    } catch (error) {
        console.error("Error fetching vehicle data for edit:", error);
        alert("Failed to load vehicle data for editing.");
    }
}

// Delete vehicle
window.deleteVehicle = async function deleteVehicle(id) {
    const confirmDelete = confirm("Are you sure you want to delete this vehicle?");
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle?vehicleId=${id}`, { method: "DELETE" });
            const result = await response.json();
            if (response.ok) {
                alert("Vehicle deleted successfully!");
                loadVehicles();  // Refresh table after deletion
            } else {
                alert(`Failed to delete vehicle: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            alert("An error occurred while deleting data.");
            setTimeout(() => {
                loadVehicles();  // Calling loadVehicles again to reload the table data.
            }, 1000);
        }
    }
}

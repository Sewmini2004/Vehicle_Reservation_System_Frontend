import VehicleView from "../views/VehicleView";

export function VehicleController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = VehicleView();  // Load vehicle view
    loadVehicles();  // Fetch and display vehicle data

    let debounceTimer;  // To store the debounce timer

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
            vehicleId: vehicleId ? parseInt(vehicleId) : 0,
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
            let result;
            if (vehicleId) {
                // Update existing vehicle
                response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle?vehicleId=${vehicleId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vehicle),
                });
                result = await response.json();
                if (response.ok) {
                    alert("Vehicle updated successfully!");
                } else {
                    alert(`Failed to update vehicle: ${result.message}`);
                }
            } else {
                // Add new vehicle
                response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vehicle),
                });
                result = await response.json();
                if (response.ok) {
                    alert("Vehicle saved successfully!");
                } else {
                    alert(`Failed to save vehicle: ${result.message}`);
                }
            }

            // Refresh the vehicle table and close the modal after a successful operation
            loadVehicles();  // Refresh vehicle table
            bootstrap.Modal.getInstance(document.getElementById("vehicleModal")).hide();  // Close modal
        } catch (error) {
            console.error("Error saving or updating vehicle:", error);
            alert("An error occurred while saving/updating data.");
            setTimeout(() => {
                loadVehicles();  // Reload the vehicle table in case of failure
            }, 1000);
        }
    });

    // Search functionality with debounce
    document.getElementById("searchVehicle").addEventListener("input", async (event) => {
        const searchTerm = event.target.value.trim();
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            loadVehicles(searchTerm);
        }, 500);
    });

}

// Load vehicles dynamically with optional search term
window.loadVehicles = async function loadVehicles(searchTerm = '') {
    console.log("Loading vehicle data...");

    try {
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle?search=${searchTerm}`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the JSON data
        const vehicles = await response.json();

        console.log("Vehicles fetched successfully:");
        console.log(vehicles);

        const tableBody = document.getElementById("vehicleTableBody");
        tableBody.innerHTML = "";  // Clear previous data

        // If no vehicles are found, display a "No vehicles found" message
        if (vehicles.length === 0) {
            const noResultsRow = document.createElement("tr");
            noResultsRow.innerHTML = `<td colspan="8" style="text-align: center;">No vehicles found</td>`;
            tableBody.appendChild(noResultsRow);
        } else {
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
        }
    } catch (error) {
        console.error("Error loading vehicles:", error);
        alert("An error occurred while loading vehicle data.");
    }
}


// Edit vehicle
window.editVehicle = async function editVehicle(id) {
    console.log("Editing vehicle with ID:", id);
    try {
        // Fetch the list of all vehicles
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle`);

        // Parse the JSON response
        const vehicles = await response.json();

        // Find the vehicle by matching the vehicleId
        const vehicle = vehicles.find(vehicle => vehicle.vehicleId === id);

        if (!vehicle) {
            // If no vehicle is found with the given id
            console.error("Vehicle not found");
            alert("Vehicle not found!");
            return;
        }

        // Now populate the form with the found vehicle data
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
            const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle?vehicleId=${id}`, { method: "DELETE" });
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

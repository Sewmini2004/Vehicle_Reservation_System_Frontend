import BookingView from "../views/BookingView";
import { initMap } from "./MapController";

export function BookingController() {

    const appDiv = document.getElementById("app");
    appDiv.innerHTML = BookingView(); // Load booking view

    document.getElementById("go-payment").addEventListener("click", function () {
        window.location.href = "/payment";
    });

    initMap(); // Initialize map for pickup and drop locations
    loadVehicles(); // Load vehicle dropdown data when page loads
    loadCustomers(); // Load customer dropdown
    loadDrivers();   // Load driver dropdown

    setTimeout(() => {
        const vehicleDropdown = document.getElementById("vehicleDropdown");
        const carTypeDropdown = document.getElementById("carTypeDropdown");

        if (vehicleDropdown && carTypeDropdown) {
            vehicleDropdown.addEventListener("change", function () {
                const selectedVehicle = this.options[this.selectedIndex];

                if (selectedVehicle.value) {
                    carTypeDropdown.innerHTML = `<option value="${selectedVehicle.dataset.carType}">${selectedVehicle.dataset.carType}</option>`;
                } else {
                    carTypeDropdown.innerHTML = `<option value="">Select a Car Type</option>`;
                }
            });
        } else {
            console.error("Vehicle or Car Type dropdown not found in the DOM.");
        }
    }, 100); // Delay to ensure DOM is rendered


    // Open modal for adding a new booking
    document.getElementById("addBookingBtn").addEventListener("click", () => {
        document.getElementById("bookingModalLabel").innerText = "Add Booking";
        document.getElementById("bookingForm").reset();
        document.getElementById("bookingId").value = "";
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    });

    document.getElementById("saveBookingBtn").addEventListener("click", async () => {
        const booking = {
            customerId: document.getElementById("customerDropdown").value,
            driverId: document.getElementById("driverDropdown").value,
            vehicleId: document.getElementById("vehicleDropdown").value,
            pickupLocation: document.getElementById("pickupLocation").value,
            dropoffLocation: document.getElementById("dropLocation").value,
            bookingDate: document.getElementById("bookingDate").value,
            totalBill: document.getElementById("totalBill").value,
        };

        try {
            const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Booking saved successfully!");
                loadBookings(); // Reload the booking list
            } else {
                alert(`Failed to save booking: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while saving booking.");
        }
    });
}

// Function to load vehicles into the dropdown
async function loadVehicles() {
    try {
        const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle"); // Update endpoint if needed
        if (!response.ok) throw new Error("Failed to fetch vehicles");

        const vehicles = await response.json();
        const vehicleDropdown = document.getElementById("vehicleDropdown");
        vehicleDropdown.innerHTML = '<option value="">Select a Vehicle</option>'; // Default option

        vehicles.forEach(vehicle => {
            const option = document.createElement("option");
            option.value = vehicle.vehicleId; // Ensure this matches API response
            option.textContent = `${vehicle.registrationNumber} - ${vehicle.model}`; // Customize display
            option.dataset.carType = vehicle.carType; // Store car type in data attribute
            vehicleDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading vehicles:", error);
    }
}

// Function to load customers into the dropdown
async function loadCustomers() {
    try {
        const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/customer"); // Update the API URL if needed
        if (!response.ok) throw new Error("Failed to fetch customers");

        const customers = await response.json();
        const customerDropdown = document.getElementById("customerDropdown");
        customerDropdown.innerHTML = '<option value="">Select a Customer</option>'; // Default option

        customers.forEach(customer => {
            const option = document.createElement("option");
            option.value = customer.customerId; // Ensure this matches your API response
            option.textContent = `${customer.name} `; // Customize the display
            customerDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading customers:", error);
    }
}

// Function to load drivers into the dropdown
async function loadDrivers() {
    try {
        const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver"); // Update API URL if needed
        if (!response.ok) throw new Error("Failed to fetch drivers");

        const drivers = await response.json();
        const driverDropdown = document.getElementById("driverDropdown");
        driverDropdown.innerHTML = '<option value="">Select a Driver</option>'; // Default option

        drivers.forEach(driver => {
            const option = document.createElement("option");
            option.value = driver.driverId; // Ensure this matches your API response
            option.textContent = `${driver.name} - ${driver.status}`; // Customize display
            driverDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading drivers:", error);
    }
}

window.onload = function () {
    document.getElementById("vehicleDropdown").addEventListener("change", function () {
        const selectedVehicle = this.options[this.selectedIndex]; // Get selected option
        const carTypeDropdown = document.getElementById("carTypeDropdown");

        if (selectedVehicle.value) {
            carTypeDropdown.innerHTML = `<option value="${selectedVehicle.dataset.carType}">${selectedVehicle.dataset.carType}</option>`;
        } else {
            carTypeDropdown.innerHTML = `<option value="">Select a Car Type</option>`; // Reset if no vehicle is selected
        }
    });
};



// Load bookings dynamically
window.loadBookings = async function loadBookings() {
    try {
        const response = await fetch("http://localhost:8088/booking");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const bookings = await response.json();

        const tableBody = document.getElementById("bookingTableBody");
        tableBody.innerHTML = "";

        bookings.forEach(booking => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.customerId}</td>
                <td>${booking.driverId}</td>
                <td>${booking.vehicleId}</td>
                <td>${booking.pickupLocation}</td>
                <td>${booking.dropoffLocation}</td>
                <td>${booking.bookingDate}</td>
                <td>${booking.totalBill}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editBooking(${booking.bookingId})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBooking(${booking.bookingId})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        alert("Error loading bookings.");
    }
};

// Edit booking
window.editBooking = async function editBooking(id) {
    try {
        const response = await fetch(`http://localhost:8088/booking?bookingId=${id}`);
        const booking = await response.json();
        document.getElementById("bookingId").value = booking.bookingId;
        document.getElementById("customerDropdown").value = booking.customerId;
        document.getElementById("driverDropdown").value = booking.driverId;
        document.getElementById("vehicleDropdown").value = booking.vehicleId;
        document.getElementById("pickupLocation").value = booking.pickupLocation;
        document.getElementById("dropLocation").value = booking.dropoffLocation;
        document.getElementById("bookingDate").value = booking.bookingDate;
        document.getElementById("totalBill").value = booking.totalBill;
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    } catch (error) {
        alert("Failed to load booking data.");
    }
};


// Delete booking
window.deleteBooking = async function deleteBooking(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        try {
            const response = await fetch(`http://localhost:8088/booking?bookingId=${id}`, { method: "DELETE" });
            if (response.ok) {
                alert("Booking deleted successfully!");
                loadBookings();
            } else {
                alert("Failed to delete booking.");
            }
        } catch (error) {
            alert("An error occurred while deleting booking.");
        }
    }
};

import BookingView from "../views/BookingView";
import {initMap} from "./MapController";

export function BookingController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = BookingView(); // Load booking view

    initMap(); // Initialize map for pickup and drop locations
    loadVehicles();
    loadCustomers();
    loadDrivers();
    loadBookings();

    // Handle payment redirection on booking completion
    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "go-payment") {
            const bookingData = {
                customer: document.getElementById("customerDropdown").value,
                vehicle: document.getElementById("vehicleDropdown").value,
                driver: document.getElementById("driverDropdown").value,
                pickupLocation: document.getElementById("pickupLocation").value,
                dropLocation: document.getElementById("dropLocation").value,
                bookingDate: document.getElementById("bookingDate").value,
                carType: document.getElementById("carTypeDropdown").value,
                totalBill: document.getElementById("totalBill").value,
                distance: document.getElementById("distance").value
            };

            console.log("Collected Booking Data:", bookingData);

            // Convert booking data to query string
            const queryString = new URLSearchParams(bookingData).toString();
            window.location.href = `/payment?${queryString}`;
        }
    });

    // Open modal for adding a new booking
    document.getElementById("addBookingBtn").addEventListener("click", () => {
        document.getElementById("bookingModalLabel").innerText = "Add Booking";
        document.getElementById("bookingForm").reset();
        document.getElementById("bookingId").value = "";
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    });

    // Dynamic carType dropdown change on vehicle selection
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
    }, 100);
}

// Function to load vehicles into the dropdown
async function loadVehicles() {
    try {
        const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle");
        if (!response.ok) throw new Error("Failed to fetch vehicles");

        const vehicles = await response.json();
        const vehicleDropdown = document.getElementById("vehicleDropdown");
        vehicleDropdown.innerHTML = '<option value="">Select a Vehicle</option>';

        vehicles.forEach(vehicle => {
            const option = document.createElement("option");
            option.value = vehicle.vehicleId;
            option.textContent = `${vehicle.registrationNumber} - ${vehicle.model}`;
            option.dataset.carType = vehicle.carType;
            vehicleDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading vehicles:", error);
    }
}

// Function to load customers into the dropdown
async function loadCustomers() {
    try {
        const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer");
        if (!response.ok) throw new Error("Failed to fetch customers");

        const customers = await response.json();
        const customerDropdown = document.getElementById("customerDropdown");
        customerDropdown.innerHTML = '<option value="">Select a Customer</option>';

        customers.forEach(customer => {
            const option = document.createElement("option");
            option.value = customer.customerId;
            option.textContent = `${customer.name}`;
            customerDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading customers:", error);
    }
}

// Function to load drivers into the dropdown
async function loadDrivers() {
    try {
        const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/driver");
        if (!response.ok) throw new Error("Failed to fetch drivers");

        const drivers = await response.json();
        const driverDropdown = document.getElementById("driverDropdown");
        driverDropdown.innerHTML = '<option value="">Select a Driver</option>';

        drivers.forEach(driver => {
            const option = document.createElement("option");
            option.value = driver.driverId;
            option.textContent = `${driver.name} - ${driver.status}`;
            driverDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading drivers:", error);
    }
}


// Function to load bookings dynamically
window.loadBookings = async function loadBookings() {
    try {
        const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/booking");
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const bookings = await response.json();
        const tableBody = document.getElementById("bookingTableBody");

        tableBody.innerHTML = "";

        // Track added booking IDs to prevent duplicate rows
        const addedBookingIds = new Set();

        console.log("Booking length " + bookings.length);
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i];
            if (addedBookingIds.has(booking.bookingId)) {
                continue;
            }

            const row = document.createElement("tr");

            // Format the booking date (helper function)
            const formattedDate = formatDateToInput(booking.bookingDate);

            row.innerHTML = `
                 
                 
                <td>${booking.customerName}</td>
                <td>${booking.vehicleRegistrationNumber} - ${booking.vehicleModel}</td>
                <td>${booking.driverName}</td>
                <td>${booking.pickupLocation}</td>
                <td>${booking.dropLocation}</td>
                <td>${formattedDate}</td>
                <td>${booking.carType}</td>
                <td>${booking.totalBill}</td>
                <td class="table-border-right">
                    <center>
                        <a class="btn btn-warning btn-sm" title="Edit" onclick="editBooking(${booking.bookingId})">
                            <i class="fa fa-edit"></i>
                        </a>
                        <a class="btn btn-danger btn-sm" title="Delete" onclick="deleteBooking(${booking.bookingId})">
                            <i class="fa fa-trash"></i>
                        </a>
                    </center>
                </td>
            `;

            console.log("Iterated");
            // Append the row to the table body
            tableBody.appendChild(row);
            // Add booking ID to the set to track added bookings
            addedBookingIds.add(booking.bookingId);

        }
    } catch (error) {
        console.error("Error loading bookings:", error);
        alert("Error loading bookings.");
    }
};

// Helper function to format the date to yyyy-mm-dd for input type="date"
function formatDateToInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Edit booking
window.editBooking = async function editBooking(id) {
    try {
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/booking?bookingId=${id}`);
        const booking = await response.json();

        // Set form fields
        document.getElementById("bookingId").value = booking.bookingId;
        document.getElementById("customerDropdown").value = booking.customerId;
        document.getElementById("driverDropdown").value = booking.driverId;
        document.getElementById("vehicleDropdown").value = booking.vehicleId;
        document.getElementById("pickupLocation").value = booking.pickupLocation;
        document.getElementById("dropLocation").value = booking.dropLocation;

        const formattedDateForInput = formatDateToInput(booking.bookingDate);
        document.getElementById("bookingDate").value = formattedDateForInput;
        document.getElementById("totalBill").value = booking.totalBill;
        document.getElementById("bookingModalLabel").innerText = "Edit Booking";
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    } catch (error) {
        alert("Failed to load booking data.");
    }
};

// Delete booking
window.deleteBooking = async function deleteBooking(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        try {
            const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/booking?bookingId=${id}`, {method: "DELETE"});
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

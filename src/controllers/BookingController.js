import BookingView from "../views/BookingView";
import { initMap } from "./MapController";

export function BookingController() {

    const appDiv = document.getElementById("app");
    appDiv.innerHTML = BookingView(); // Load booking view

    initMap(); // Initialize map for pickup and drop locations
    loadVehicles(); // Load vehicle dropdown data when page loads
    loadCustomers(); // Load customer dropdown
    loadDrivers();   // Load driver dropdown
    loadBookings();


    document.addEventListener("DOMContentLoaded", function () {
        const goPaymentBtn = document.getElementById("go-payment");

        // Go to payment button logic
        goPaymentBtn.addEventListener("click", function () {
            // Collect booking data
            const bookingData = {
                customer: document.getElementById("customerDropdown").value,
                vehicle: document.getElementById("vehicleDropdown").value,
                driver: document.getElementById("driverDropdown").value,
                pickupLocation: document.getElementById("pickupLocation").value,
                dropLocation: document.getElementById("dropLocation").value,
                bookingDate: document.getElementById("bookingDate").value,
                carType: document.getElementById("carTypeDropdown").value,
                totalBill: document.getElementById("totalBill").value,
            };

            // Convert booking data to query string
            const queryString = new URLSearchParams(bookingData).toString();

            // Redirect to the payment page with the booking data in the query string
            window.location.href = `/payment?${queryString}`; // Pass data in URL
        });
    });


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
        const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/booking");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const bookings = await response.json();

        const tableBody = document.getElementById("bookingTableBody");
        tableBody.innerHTML = "";

        for (const booking of bookings) {
            // Fetch the customer, driver, and vehicle details using the IDs
            const customerResponse = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/customer?customerId=${booking.customerId}`);
            const driverResponse = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/driver?driverId=${booking.driverId}`);
            const vehicleResponse = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/vehicle?vehicleId=${booking.vehicleId}`);

            const customer = await customerResponse.json();
            const driver = await driverResponse.json();
            const vehicle = await vehicleResponse.json();

            let editBtn = '';
            let deleteBtn = '';

            editBtn = ` <a class="btn btn-warning btn-sm " title="Edit" onclick="editBooking(${booking.bookingId})"><i class="fa fa-edit"></i></a>`;
            deleteBtn = ` <a class="btn btn-danger btn-sm " title="Delete" onclick="deleteBooking(${booking.bookingId})"><i class="fa fa-trash"></i></a>`;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.name}</td> <!-- Display customer name -->
                <td>${driver.name}</td> <!-- Display driver name -->
                <td>${vehicle.registrationNumber} - ${vehicle.model}</td> <!-- Display vehicle registration number and model -->
                <td>${booking.pickupLocation}</td>
                <td>${booking.dropLocation}</td>
                <td>${booking.bookingDate}</td>
                <td>${booking.carType}</td>
                <td>${booking.totalBill}</td>
                <td class="table-border-right">
                    <center>
                        ${editBtn}
                        ${deleteBtn}
                    </center>
                </td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        alert("Error loading bookings.");
    }
};




// Edit booking
window.editBooking = async function editBooking(id) {
    try {
        const response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/booking?bookingId=${id}`);
        const booking = await response.json();

        // Set form fields
        document.getElementById("bookingId").value = booking.bookingId;
        document.getElementById("customerDropdown").value = booking.customerId;
        document.getElementById("driverDropdown").value = booking.driverId;
        document.getElementById("vehicleDropdown").value = booking.vehicleId;
        document.getElementById("pickupLocation").value = booking.pickupLocation;
        document.getElementById("dropLocation").value = booking.dropLocation;

        console.log("+++++ booking.bookingDate ++++++" + booking.bookingDate); // For debugging

        // Format bookingDate to yyyy-mm-dd for the date input field
        const formattedDateForInput = formatDateToInput(booking.bookingDate);
        console.log("+++++ formattedDateForInput ++++++" + formattedDateForInput); // For debugging

        // Set the bookingDate input field value (Ensure the date format is correct)
        document.getElementById("bookingDate").value = formattedDateForInput;

        document.getElementById("totalBill").value = booking.totalBill;
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    } catch (error) {
        alert("Failed to load booking data.");
    }
};

// Helper function to format the date to yyyy-mm-dd for input type="date"
function formatDateToInput(dateString) {
    const date = new Date(dateString);  // Convert string to Date object
    const year = date.getFullYear();    // Get the full year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (add 1 because months are 0-indexed) and pad with leading zero
    const day = String(date.getDate()).padStart(2, '0');  // Get the day and pad with leading zero

    return `${year}-${month}-${day}`;  // Return formatted as yyyy-mm-dd
}

// Delete booking
window.deleteBooking = async function deleteBooking(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        try {
            const response = await fetch(`http://localhost:8088/Vehicle_Reservation_System_Backend_war/booking?bookingId=${id}`, { method: "DELETE" });
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

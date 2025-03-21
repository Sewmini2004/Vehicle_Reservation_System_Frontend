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
            // Validate if all required fields are filled
            const isFormValid = document.getElementById("bookingForm").checkValidity();
            if (!isFormValid) {
                alert("Please fill in all required fields.");
                return; // Prevent payment redirection if form is invalid
            }

            const bookingData = {
                customer: document.getElementById("customerDropdown").value,
                vehicle: document.getElementById("vehicleDropdown").value,
                driver: document.getElementById("driverDropdown").value,
                pickupLocation: document.getElementById("pickupLocation").value,
                dropLocation: document.getElementById("dropLocation").value,
                bookingDate: document.getElementById("bookingDate").value,
                carType: document.getElementById("carTypeDropdown").value,
                totalBill: document.getElementById("totalBill").value,
                distance: extractDistanceNumber(document.getElementById("distance").value)
            };

            console.log("distance ::::::::::::::::");
            console.log(document.getElementById("distance").value);
            console.log("Collected Booking Data:", bookingData);

            // Convert booking data to query string
            const queryString = new URLSearchParams(bookingData).toString();
            window.location.href = `/payment?${queryString}`;
        }
    });

    function extractDistanceNumber(distanceStr) {
        // Use regular expression to extract numbers from the distance string
        const match = distanceStr.match(/(\d+(\.\d+)?)/); // Match the numeric part
        return match ? match[0] : "0"; // If there's a match, return the number, else return "0"
    }

    // Open modal for adding a new booking
    document.getElementById("addBookingBtn").addEventListener("click", () => {
        document.getElementById("bookingModalLabel").innerText = "Add Booking";
        document.getElementById("bookingForm").reset();
        document.getElementById("bookingId").value = "";
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    });

    // Enable or disable "Go to Payment" button based on form validity
    document.getElementById("bookingForm").addEventListener("input", () => {
        const goPaymentBtn = document.getElementById("go-payment");
        const form = document.getElementById("bookingForm");
        if (form.checkValidity()) {
            goPaymentBtn.disabled = false;
        } else {
            goPaymentBtn.disabled = true;
        }
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

    // Adding the search functionality to filter bookings
    let debounceTimer;

    document.getElementById("searchBooking").addEventListener("input", async (event) => {
        const searchTerm = event.target.value.trim();

        // Clear the previous debounce timer
        clearTimeout(debounceTimer);

        // Set a new debounce timer for 500ms
        debounceTimer = setTimeout(async () => {
            loadBookings(searchTerm);  // Call the loadBookings function with search term
        }, 500);
    });
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
// Modify loadBookings to take an optional searchTerm
window.loadBookings = async function loadBookings(searchTerm = '') {
    try {
        // Fetch bookings from the backend with the search term
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/booking?search=${searchTerm}`);
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const bookings = await response.json();
        const tableBody = document.getElementById("bookingTableBody");

        tableBody.innerHTML = ""; // Clear the previous table data

        if (bookings.length === 0) {
            const noResultsRow = document.createElement("tr");
            noResultsRow.innerHTML = `<td colspan="10" style="text-align: center;">No bookings found</td>`;
            tableBody.appendChild(noResultsRow);
        } else {
            bookings.forEach(booking => {
                const row = document.createElement("tr");

                const formattedDate = formatDateToInput(booking.bookingDate);

                row.innerHTML = `
                    <td>${booking.customerName}</td>
                    <td>${booking.vehicleRegistrationNumber} - ${booking.vehicleModel}</td>
                    <td>${booking.driverName}</td>
                    <td>${booking.pickupLocation}</td>
                    <td>${booking.dropLocation}</td>
                    <td>${booking.distance}</td>
                    <td>${formattedDate}</td>
                    <td>${booking.carType}</td>
                    <td>${booking.totalBill}</td>
                    <td class="table-border-right">
                        <center>
                           
                           <a class="btn btn-danger btn-sm" title="Cancel" >
                            <i class="fa fa-times"></i> Cancel
                        </a>

                        </center>
                    </td>
                `;

                tableBody.appendChild(row);
            });
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
        document.getElementById("distance").value = booking.distance;

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

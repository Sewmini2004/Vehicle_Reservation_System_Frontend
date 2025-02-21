import BookingView from "../views/BookingView";
import {initMap} from "./MapController";

export function BookingController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = BookingView(); // Load booking view

    initMap(); // Initialize map for pickup and drop locations
    // Open modal for adding a new booking
    document.getElementById("addBookingBtn").addEventListener("click", () => {
        document.getElementById("bookingModalLabel").innerText = "Add Booking";
        document.getElementById("bookingForm").reset();
        document.getElementById("bookingId").value = "";
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    });

    document.getElementById("saveBookingBtn").addEventListener("click", async () => {
        const booking = {
            customerId: document.getElementById("customerId").value,
            driverId: document.getElementById("driverId").value,
            vehicleId: document.getElementById("vehicleId").value,
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
            } else {
                alert(`Failed to save booking: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while saving booking.");
        }
    });
}

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
        document.getElementById("customerId").value = booking.customerId;
        document.getElementById("driverId").value = booking.driverId;
        document.getElementById("vehicleId").value = booking.vehicleId;
        document.getElementById("pickupLocation").value = booking.pickupLocation;
        document.getElementById("dropoffLocation").value = booking.dropoffLocation;
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

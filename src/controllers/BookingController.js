import BookingView from "../views/BookingView";

export function BookingController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = BookingView();
    //
    // loadCustomers();
    // loadDrivers();
    // loadVehicles();

    document.getElementById("addBookingBtn").addEventListener("click", () => {
        document.getElementById("bookingModalLabel").innerText = "Add Booking";
        document.getElementById("bookingForm").reset();
        new bootstrap.Modal(document.getElementById("bookingModal")).show();
    });
}
import PaymentView from "../views/PaymentView";

export function PaymentController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = PaymentView(); // Render the payment view

    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        // Open modal for adding a new payment
        document.getElementById("addPaymentBtn").addEventListener("click", () => {
            console.log("Opening payment modal...");

            // Reset the form and set up modal label
            document.getElementById("paymentModalLabel").innerText = "Add Payment";
            document.getElementById("paymentForm").reset(); // Reset the form

            // Clear any previous values
            document.getElementById("paymentId").value = "";

            // Trigger Bootstrap modal
            const paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
            paymentModal.show();  // This shows the modal
        });

        // Retrieve booking details from session storage
        const booking = JSON.parse(sessionStorage.getItem("bookingDetails"));
        if (booking) {
            // Check if the elements exist before assigning values
            if (document.getElementById("customerId")) {
                document.getElementById("customerId").value = booking.customer;
            }
            if (document.getElementById("driverId")) {
                document.getElementById("driverId").value = booking.driver;
            }
            if (document.getElementById("vehicleId")) {
                document.getElementById("vehicleId").value = booking.vehicle;
            }
            if (document.getElementById("pickupLocation")) {
                document.getElementById("pickupLocation").value = booking.pickupLocation;
            }
            if (document.getElementById("dropLocation")) {
                document.getElementById("dropLocation").value = booking.dropoffLocation;
            }
            if (document.getElementById("bookingDate")) {
                document.getElementById("bookingDate").value = booking.bookingDate;
            }
            if (document.getElementById("totalAmount")) {
                document.getElementById("totalAmount").value = booking.totalBill;
            }
        }

        // Function to calculate the final amount dynamically
        function calculateFinalAmount() {
            const total = parseFloat(document.getElementById("totalAmount").value) || 0;
            const discount = parseFloat(document.getElementById("discountAmount").value) || 0;
            const tax = parseFloat(document.getElementById("taxAmount").value) || 0;
            const finalAmount = total - discount + tax;

            document.getElementById("finalAmount").value = finalAmount.toFixed(2);
        }

        // Event listeners to update final amount in real-time
        document.getElementById("discountAmount").addEventListener("input", calculateFinalAmount);
        document.getElementById("taxAmount").addEventListener("input", calculateFinalAmount);

        // Handle payment save
        document.getElementById("savePaymentBtn").addEventListener("click", async () => {
            console.log("Saving payment...");
            const queryParams = new URLSearchParams(window.location.search);

            const customer = queryParams.get("customer");
            const vehicle = queryParams.get("vehicle");
            const driver = queryParams.get("driver");
            const pickupLocation = queryParams.get("pickupLocation");
            const dropLocation = queryParams.get("dropLocation");
            const bookingDate = queryParams.get("bookingDate");
            const totalBill = queryParams.get("totalBill");

            console.log("Customer:", customer);
            console.log("Vehicle:", vehicle);
            console.log("Driver:", driver);
            console.log("Pickup Location:", pickupLocation);
            console.log("Drop Location:", dropLocation);
            console.log("Booking Date:", bookingDate);
            console.log("Total Bill:", totalBill);

            // Collect payment data from the form
            const paymentData = {
             //   bookingId: document.getElementById("bookingId") ? document.getElementById("bookingId").value : "",
                customerId: customer,
                driverId: driver,
                vehicleId: vehicle,
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                bookingDate: bookingDate,
                totalBill: document.getElementById("totalAmount").value,
                discountAmount: document.getElementById("discountAmount").value,
                taxAmount: document.getElementById("taxAmount").value,
                finalAmount: document.getElementById("finalAmount").value,
                paymentMethod: document.getElementById("paymentMethod").value,
                paymentStatus: document.getElementById("paymentStatus").value,
            };

            // // Check if bookingId exists before saving
            // if (!paymentData.bookingId) {
            //     alert("Booking ID is missing, cannot save payment.");
            //     return;
            // }

            console.log("paymentData")
            console.log(JSON.stringify(paymentData))
            try {
                // Send payment data to backend
                const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentData),
                });

                if (response.ok) {
                    alert("Payment successful!");
                    location.reload(); // Refresh page to update payment table
                } else {
                    const errorData = await response.json();
                    alert(`Payment failed: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Error while processing payment:", error);
                alert("An error occurred while processing payment.");
            }
        });
    });
}

import PaymentView from "../views/PaymentView";

export function PaymentController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = PaymentView();


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
        document.getElementById("bookingId").value = booking.bookingId;
        document.getElementById("totalAmount").value = booking.totalBill;
        document.getElementById("customerId").value = booking.customerId;
        document.getElementById("driverId").value = booking.driverId;
        document.getElementById("vehicleId").value = booking.vehicleId;
        document.getElementById("pickupLocation").value = booking.pickupLocation;
        document.getElementById("dropLocation").value = booking.dropoffLocation;
        document.getElementById("bookingDate").value = booking.bookingDate;
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
        const paymentData = {
            bookingId: document.getElementById("bookingId").value,
            customerId: document.getElementById("customerId").value,
            driverId: document.getElementById("driverId").value,
            vehicleId: document.getElementById("vehicleId").value,
            pickupLocation: document.getElementById("pickupLocation").value,
            dropLocation: document.getElementById("dropLocation").value,
            bookingDate: document.getElementById("bookingDate").value,
            totalAmount: document.getElementById("totalAmount").value,
            discountAmount: document.getElementById("discountAmount").value,
            taxAmount: document.getElementById("taxAmount").value,
            finalAmount: document.getElementById("finalAmount").value,
            paymentMethod: document.getElementById("paymentMethod").value,
            paymentStatus: document.getElementById("paymentStatus").value,
        };

        try {
            const response = await fetch("http://localhost:8088/Vehicle_Reservation_System_Backend_war/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert("Payment successful!");
                location.reload(); // Refresh page to update payment table
            } else {
                alert("Payment failed.");
            }
        } catch (error) {
            alert("An error occurred while processing payment.");
        }
    });


}

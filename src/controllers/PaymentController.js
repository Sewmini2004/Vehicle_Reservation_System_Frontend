// PaymentController.js
import PaymentView from "../views/PaymentView";

export function PaymentController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = PaymentView();

    const booking = JSON.parse(sessionStorage.getItem("bookingDetails"));
    if (booking) {
        document.getElementById("customerId").value = booking.customerId;
        document.getElementById("driverId").value = booking.driverId;
        document.getElementById("vehicleId").value = booking.vehicleId;
        document.getElementById("pickupLocation").value = booking.pickupLocation;
        document.getElementById("dropLocation").value = booking.dropoffLocation;
        document.getElementById("bookingDate").value = booking.bookingDate;
        document.getElementById("totalBill").value = booking.totalBill;
    }

    document.getElementById("savePaymentBtn").addEventListener("click", async () => {
        const paymentData = {
            ...booking,
            paymentAmount: document.getElementById("paymentAmount").value,
            paymentMethod: document.getElementById("paymentMethod").value,
        };

        try {
            const response = await fetch("http://localhost:8088/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert("Payment successful!");
                window.location.href = "/bookings"; // Redirect to booking list
            } else {
                alert("Payment failed.");
            }
        } catch (error) {
            alert("An error occurred while processing payment.");
        }
    });
}

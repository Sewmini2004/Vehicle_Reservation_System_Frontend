import PaymentView from "../views/PaymentView";

export function PaymentController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = PaymentView();
    loadPayments();
    loadStaticDropdowns();
        // Open modal for adding a new payment
        document.getElementById("addPaymentBtn").addEventListener("click", () => {
            console.log("Opening payment modal...");

            document.getElementById("paymentModalLabel").innerText = "Add Payment";
            document.getElementById("paymentForm").reset();

            document.getElementById("paymentId").value = "";
            const paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
            paymentModal.show();
        });

    // Search payments by payment method or status or any other field
    let debounceTimer;

    document.getElementById("searchPayment").addEventListener("input", async (event) => {
        const searchTerm = event.target.value.trim();
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            loadPayments(searchTerm);  // Call the backend with search term
        }, 500);
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
            if (document.getElementById("carType")) {
                document.getElementById("carType").value = booking.carType;
            }
            if (document.getElementById("totalAmount")) {
                document.getElementById("totalAmount").value = booking.totalBill;
            }
             if (document.getElementById("distance")) {
                document.getElementById("distance").value = booking.distance;
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
            const carType = queryParams.get("carType");
            const pickupLocation = queryParams.get("pickupLocation");
            const dropLocation = queryParams.get("dropLocation");
            const bookingDate = queryParams.get("bookingDate");
            const totalBill = queryParams.get("totalBill");
            const distance = queryParams.get("distance");

            console.log("Customer:", customer);
            console.log("Vehicle:", vehicle);
            console.log("Driver:", driver);
            console.log("Driver:", carType);
            console.log("Pickup Location:", pickupLocation);
            console.log("Drop Location:", dropLocation);
            console.log("Booking Date:", bookingDate);
            console.log("Total Bill:", totalBill);
            console.log("distance:", distance);

            // Collect payment data from the form
            const paymentData = {
             //   bookingId: document.getElementById("bookingId") ? document.getElementById("bookingId").value : "",
                customerId: customer,
                driverId: driver,
                vehicleId: Number(vehicle),
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                carType: carType,
                bookingDate: bookingDate,
                distance: distance,
                totalBill: document.getElementById("totalAmount").value,
                discountAmount: document.getElementById("discountAmount").value,
                taxAmount: document.getElementById("taxAmount").value,
                finalAmount: document.getElementById("finalAmount").value,
                paymentMethod: document.getElementById("paymentMethod").value,
                paymentStatus: document.getElementById("paymentStatus").value,


            };

            console.log(document.getElementById("paymentMethod").value);
            console.log(document.getElementById("paymentStatus").value);

            console.log("paymentData")
            console.log(JSON.stringify(paymentData))
            try {
                const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentData),
                });

                if (response.ok) {
                    alert("Payment successful!");
                    window.location.href = "/payment";
                    loadPayments();
                } else {
                    const errorData = await response.json();
                    alert(`Payment failed: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Error while processing payment:", error);
                alert("An error occurred while processing payment.");
            }
        });

}

// Fetch payments from the backend and display them in the table
async function loadPayments(searchTerm = '') {
    try {
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/billing?search=${searchTerm}`);
        const payments = await response.json();

        const paymentTableBody = document.getElementById("paymentTableBody");
        paymentTableBody.innerHTML = ''; // Clear existing rows

        payments.forEach(payment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${payment.billId}</td>
                <td>${payment.bookingId}</td>
                <td>${payment.totalAmount}</td>
                <td>${payment.discountAmount}</td>
                <td>${payment.taxAmount}</td>
                <td>${payment.finalAmount}</td>
                <td>${payment.paymentMethod}</td>
                <td>${payment.paymentStatus}</td>
                <td>
                    <center>
                    
                    </center>
                </td>
            `;
            paymentTableBody.appendChild(row);
        });

        // Event listener for "Edit" buttons to edit payments
        document.querySelectorAll("#editPaymentBtn").forEach(button => {
            button.addEventListener("click", (event) => {
                const paymentId = event.target.getAttribute("data-payment-id");

                // Retrieve payment details and open the modal for editing
                fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/billing/${paymentId}`)
                    .then(response => response.json())
                    .then(payment => {
                        sessionStorage.setItem("paymentDetails", JSON.stringify(payment));

                        document.getElementById("paymentId").value = payment.billId;
                        document.getElementById("totalAmount").value = payment.totalAmount;
                        document.getElementById("discountAmount").value = payment.discountAmount;
                        document.getElementById("taxAmount").value = payment.taxAmount;
                        document.getElementById("finalAmount").value = payment.finalAmount;
                        document.getElementById("paymentMethod").value = payment.paymentMethod;
                        document.getElementById("paymentStatus").value = payment.paymentStatus;

                        // Open the payment modal for editing
                        const paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
                        paymentModal.show();
                    });
            });
        });

    } catch (error) {
        console.error("Error fetching payments:", error);
        alert("An error occurred while loading payments.");
    }
}

function loadStaticDropdowns() {
    const paymentMethod = document.getElementById("paymentMethod");
    paymentMethod.innerHTML = '<option value="">Select a Payment Method</option>';

    ["Cash","Card","Online"].forEach(item => {
        const option1 = document.createElement("option");
        option1.value = item;
        option1.textContent = `${item}`;
        // option.dataset.carType = item.carType;
        paymentMethod.appendChild(option1);
    });

    const paymentStatus = document.getElementById("paymentStatus");
    paymentStatus.innerHTML = '<option value="">Select a Status</option>';

    ["Pending","Completed","Failed"].forEach(item => {
        const option2 = document.createElement("option");
        option2.value = item;
        option2.textContent = `${item}`;
        // option.dataset.carType = item.carType;
        paymentStatus.appendChild(option2);
    });
}


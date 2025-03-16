import DashboardView from "../views/DashboardView";

export function DashboardController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = DashboardView(); // Render the dashboard view

    // Fetch all records for Customers, Vehicles, Drivers, and Bookings
    loadDashboardCounts();

    async function loadDashboardCounts() {
        try {
            // Fetch all records from the API
            const customerResponse = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer");
            const vehicleResponse = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/vehicle");
            const bookingResponse = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/booking");
            const driverResponse = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/driver");

            // Check if the responses are OK
            if (!customerResponse.ok || !vehicleResponse.ok || !bookingResponse.ok || !driverResponse.ok) {
                throw new Error("Failed to fetch data");
            }

            // Get all the records from the responses
            const customers = await customerResponse.json();
            const vehicles = await vehicleResponse.json();
            const bookings = await bookingResponse.json();
            const drivers = await driverResponse.json();

            // Calculate the count based on the length of the array (i.e., the number of records)
            const customerCount = customers.length;
            const vehicleCount = vehicles.length;
            const bookingCount = bookings.length;
            const driverCount = drivers.length;

            // Update the dashboard cards with the calculated counts
            document.getElementById("customerCount").textContent = customerCount;
            document.getElementById("vehicleCount").textContent = vehicleCount;
            document.getElementById("bookingCount").textContent = bookingCount;
            document.getElementById("driverCount").textContent = driverCount;

        } catch (error) {
            console.error("Error loading dashboard counts:", error);
            alert("Failed to load dashboard counts");
        }
    }
}

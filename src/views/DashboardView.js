export default function DashboardView() {
    return `
  <div class="container col-md-12">
    <div class="row">
        <!-- Customer Count Card -->
        <div class="col-md-4">
            <div class="card text-white bg-primary m-3">
                <div class="card-header fw-bold">Customers</div>
                <div class="card-body">
                    <h5 class="card-title">Total</h5>
                    <p class="card-text" id="customerCount">0</p>
                </div>
            </div>
        </div>

        <!-- Vehicle Count Card -->
        <div class="col-md-4">
            <div class="card text-white bg-success m-3">
                <div class="card-header fw-bold">Vehicles</div>
                <div class="card-body">
                    <h5 class="card-title">Total</h5>
                    <p class="card-text" id="vehicleCount">0</p>
                </div>
            </div>
        </div>

        <!-- Booking Count Card -->
        <div class="col-md-4">
            <div class="card text-white bg-warning m-3">
                <div class="card-header fw-bold">Bookings</div>
                <div class="card-body">
                    <h5 class="card-title">Total</h5>
                    <p class="card-text" id="bookingCount">0</p>
                </div>
            </div>
        </div>

        <!-- Driver Count Card -->
        <div class="col-md-4">
            <div class="card text-white bg-danger m-3">
                <div class="card-header fw-bold">Drivers</div>
                <div class="card-body">
                    <h5 class="card-title">Total</h5>
                    <p class="card-text" id="driverCount">0</p>
                </div>
            </div>
        </div>
    </div>
</div>

    `;
}

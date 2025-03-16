export function BookingForm() {
    return `
        <form id="bookingForm">
            <div class="row">
                <input type="hidden" id="bookingId">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Customer <span class="text-danger">*</span></label>
                    <select class="form-control" id="customerDropdown" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Vehicle <span class="text-danger">*</span></label>
                    <select class="form-control" id="vehicleDropdown" required>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Car Type <span class="text-danger">*</span></label>
                    <select class="form-control" id="carTypeDropdown" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Driver <span class="text-danger">*</span></label>
                    <select class="form-control" id="driverDropdown" required>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Pickup Location <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pickupLocation" required>
                    <input type="hidden" id="pickupCoordinates">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Drop Location <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="dropLocation" required>
                    <input type="hidden" id="dropCoordinates">
                </div>
            </div>
            <div id="map" style="height: 300px;"></div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label>Booking Date <span class="text-danger">*</span></label>
                    <input type="date" class="form-control" id="bookingDate" name="bookingDate" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label>Distance (km) <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="distance" required>
                </div>
                <div class="col-md-6 mb-3" hidden="hidden">
                    <label>Total Bill</label>
                    <input type="number" step="0.01" class="form-control" id="totalBill" readonly>
                </div>
            </div>
        </form>
    `;
}

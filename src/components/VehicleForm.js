export function VehicleForm() {
    return `
        <form id="vehicleForm">
            <input type="hidden" id="vehicleId">

            <!-- Row 1: Car Type, Model -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Car Type <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="carType" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Model <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="model" required>
                </div>
            </div>

            <!-- Row 2: Availability Status, Registration Number -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Availability Status <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="availabilityStatus" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Registration Number <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="registrationNumber" required>
                </div>
            </div>

            <!-- Row 3: Fuel Type, Car Model -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Fuel Type <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="fuelType" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Car Model <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="carModel" required>
                </div>
            </div>

            <!-- Row 4: Seating Capacity -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Seating Capacity <span style="color: red">*</span></label>
                    <input type="number" class="form-control" id="seatingCapacity" required>
                </div>
            </div>
        </form>
    `;
}

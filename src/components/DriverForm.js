export function DriverForm() {
    return `
        <form id="driverForm">
            <input type="hidden" id="driverId">

            <!-- Row 1: Name, License Number -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">License Number</label>
                    <input type="text" class="form-control" id="licenseNumber" required>
                </div>
            </div>

            <!-- Row 2: Status, Shift Timing -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Status</label>
                    <input type="text" class="form-control" id="status" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Shift Timing</label>
                    <input type="text" class="form-control" id="shiftTiming" required>
                </div>
            </div>

            <!-- Row 3: Salary, Experience Years -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Salary</label>
                    <input type="number" step="0.01" class="form-control" id="salary" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Experience Years</label>
                    <input type="number" class="form-control" id="experienceYears" required>
                </div>
            </div>

            <!-- Row 4: Phone Number -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="phoneNumber" required>
                </div>
            </div>
        </form>
    `;
}

export function BookingForm() {
    return `
        <form id="bookingForm">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Customer</label>
                    <select class="form-control" id="customerDropdown">
                      <option value=""></option>
                      </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Vehicle</label>
                    <select class="form-control" id="vehicleDropdown">
                     <option value=""></option>
              </select>
                  
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Driver</label>
                    <select class="form-control" id="driverDropdown"></select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Car Type</label>
                    <select class="form-control" id="carTypeDropdown">
                        <option value=""></option>
                      
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Pickup Location</label>
                    <input type="text" class="form-control" id="pickupLocation" readonly>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Drop Location</label>
                    <input type="text" class="form-control" id="dropLocation" readonly>
                </div>
            </div>
            <div id="map" style="height: 300px;"></div>
        </form>
    `;
}

export function BookingForm() {
    return `
        <form id="bookingForm">
            <div class="row">
             <input type="hidden" id="bookingId">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Customer</label>
                    <select class="form-control" id="customerDropdown">
                      <option value=""></option>
                      </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Vehicle</label>
                    <select class="form-control " id="vehicleDropdown" >
                     <option value=""></option>
              </select>
                  
                </div>
            </div>
            <div class="row">
               <div class="col-md-6 mb-3">
                    <label class="form-label">Car Type</label>
                    <select class="form-control" id="carTypeDropdown">
                        <option value=""></option>
                      
                    </select>
                </div>
                
                <div class="col-md-6 mb-3">
                    <label class="form-label">Driver</label>
                    <select class="form-control" id="driverDropdown">
                      <option value=""></option>
                </select>
                </div>
             
            </div>
          <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Pickup Location</label>
                <input type="text" class="form-control" id="pickupLocation" >
                <input type="hidden" id="pickupCoordinates">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Drop Location</label>
                <input type="text" class="form-control" id="dropLocation" >
                <input type="hidden" id="dropCoordinates">
            </div>
        </div>
        <div id="map" style="height: 300px;"></div>

            
            <div class="row">
                <div class="col-md-6 mb-3">
               <label>Booking Date</label>
               <input type="date" class="form-control" id="bookingDate" required>
                </div>
                <div class="col-md-6 mb-3">
                   <label>Total Bill</label>
                  <input type="number" step="0.01" class="form-control" id="totalBill" readonly>
           </div>
              
            </div>
           
        </form>
    `;
}

import {BookingForm} from "../components/BookingForm";

export default function BookingView() {
    return `
        <div class="container-fluid" style="padding: 2.26rem;">
            <div class="col-md">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne" style="font-size: 14px; font-weight: 525;">
                            <h4>Booking Management Form</h4>
                        </div>
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                             <div class="mb-8">
                                <input type="text" id="searchBooking" class="form-control" placeholder="Search Bookings">
                            </div>
                                <table id="booking_table" class="table table-bordered table-hover display table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Vehicle</th>
                                            <th>Driver</th>
                                            <th>Pickup Location</th>
                                            <th>Drop Location</th>
                                            <th>Booking Date</th>
                                            <th>Car Type</th>
                                            <th>Total Bill</th>
                                            <th>
                                                <center>
                                                    <button type="button" class="btn btn-success" id="addBookingBtn">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </center>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="bookingTableBody">
                                        <!-- Data will be dynamically loaded -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="bookingModalLabel">Add Booking</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${BookingForm()}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          
                              <button  type="submit" class="btn btn-warning" id="go-payment"  >
                              Go To Payment  
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

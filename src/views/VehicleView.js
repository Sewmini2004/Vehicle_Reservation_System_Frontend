import { VehicleForm } from "../components/VehicleForm.js";

export default function VehicleView() {
    return `
    <div class="container-fluid" style="padding: 2.26rem;">
        <div class="col-md">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne" style="font-size: 14px; font-weight: 525;">
                        <h4>Vehicle Management Form</h4>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                         <div class="mb-8">
                                <input type="text" id="searchVehicle" class="form-control" placeholder="Search Vehicles">
                            </div>
                            <div style="width: 100%" class="form-row">
                                <div class="col-md" id="table_row">
                                    <div><br>
                                     <div style="height: 400px; overflow-y: auto;">
                                        <table id="vehicle_table" class="table table-bordered table-hover display table-responsive-md">
                                            <thead class="">
                                                <tr>
                                                    <th>Car Type</th>
                                                    <th>Model</th>
                                                    <th>Availability Status</th>
                                                    <th>Registration Number</th>
                                                    <th>Fuel Type</th>
                                                    <th>Car Model</th>
                                                    <th>Seating Capacity</th>
                                                    <th>
                                                        <center>
                                                            <button type="button" class="btn btn-success" id="addVehicleBtn">
                                                                <i class="fas fa-plus"></i>
                                                            </button>
                                                        </center>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="vehicleTableBody">
                                                <!-- Data will be dynamically loaded -->
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <!-- Vehicle Modal (Add/Edit) -->
        <div class="modal fade" id="vehicleModal" tabindex="-1" aria-labelledby="vehicleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="vehicleModalLabel">Add Vehicle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${VehicleForm()}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="saveVehicleBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

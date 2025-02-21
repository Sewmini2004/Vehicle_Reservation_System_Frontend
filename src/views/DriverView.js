import { DriverForm } from "../components/DriverForm.js";

export default function DriverView() {
    return `
     <div class="container-fluid" style="padding: 2.26rem;" >
        <div class="col-md" >
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne" style="font-size: 14px; font-weight: 525; ">
                        <h4>Driver Management Form</h4>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <div style="width: 100%" class="form-row">
                                <div class="col-md" id="table_row">
                                    <div><br>
                                        <table id="driver_table" class="table table-bordered table-hover display table-responsive-md">
                                            <thead class="">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>License Number</th>
                                                    <th>Status</th>
                                                    <th>Shift Timing</th>
                                                    <th>Salary</th>
                                                    <th>Experience Years</th>
                                                    <th>Phone Number</th>
                                                    <th>  
                                                        <center>
                                                            <button type="button" class="btn btn-success" id="addDriverBtn">
                                                                <i class="fas fa-plus"></i>
                                                            </button>
                                                        </center>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="driverTableBody">
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
       
        <!-- Driver Modal (Add/Edit) -->
        <div class="modal fade" id="driverModal" tabindex="-1" aria-labelledby="driverModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="driverModalLabel">Add Driver</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${DriverForm()}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="saveDriverBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

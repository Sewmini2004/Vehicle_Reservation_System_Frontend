import { CustomerForm } from "../components/customerForm.js";

export default function CustomerView() {
    return `
        <div class="container mt-5">
             <div class="d-flex justify-content-between align-items-center">
        <h2>Customer List</h2>
    </div>

    <!-- Customer Table -->
    <div class="row">
        <div class="col-md">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" id="customer_table">
                    <thead class="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>NIC</th>
                            <th>Phone</th>
                            <th>Registration Date</th>
                            <th>Email</th>
                            <th>  
                                <center>
                                    <button type="button" class="btn btn-success" id="addCustomerBtn">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </center>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="customerTableBody">
                        <!-- Data will be dynamically loaded -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Customer Modal (Add/Edit) -->
    <div class="modal fade" id="customerModal" tabindex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="customerModalLabel">Add Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                      ${CustomerForm()}
                  </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-success" id="saveCustomerBtn">Save</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
}

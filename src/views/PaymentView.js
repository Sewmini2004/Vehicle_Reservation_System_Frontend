import { PaymentForm } from "../components/PaymentForm";

export default function PaymentView() {
    return `
        <div class="container-fluid" style="padding: 2.26rem;">
            <div class="col-md">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne" style="font-size: 14px; font-weight: 525;">
                            <h4>Payment Management</h4>
                        </div>
                         <div class="mb-8">
                                    <input type="text" id="searchPayment" class="form-control" placeholder="Search Payment">
                                </div>
                         <div class="card-body"> 
                        
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                             <div style="height: 500px; overflow-y: auto;">
                                <table id="payment_table" class="table table-bordered table-hover display table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>Bill ID</th>
                                            <th>Booking ID</th>
                                            <th>Total Amount</th>
                                            <th>Discount Amount</th>
                                            <th>Tax Amount</th>
                                            <th>Final Amount</th>
                                            <th>Payment Method</th>
                                            <th>Payment Status</th>
                                            <th>
                                                <center>
                                                    <button type="button" class="btn btn-success" id="addPaymentBtn">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </center>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="paymentTableBody">
                                        <!-- Data will be dynamically loaded -->
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="paymentModalLabel">Add Payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${PaymentForm()} 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" id="savePaymentBtn">Save Payment</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
    `;
}

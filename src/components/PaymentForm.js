export function PaymentForm() {
    return `
        <form id="paymentForm" class="container">
         <input type="hidden" id="paymentId">
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Total Amount</label>
                        <input type="number" step="0.01" class="form-control" id="totalAmount" >
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Discount Amount</label>
                        <input type="number" step="0.01" class="form-control" id="discountAmount">
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Tax Amount</label>
                        <input type="number" step="0.01" class="form-control" id="taxAmount">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Final Amount</label>
                        <input type="number" step="0.01" class="form-control" id="finalAmount" >
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Payment Method</label>
                        <select class="form-control" id="paymentMethod">
                            <option value=""></option>
<!--                            <option value="Cash">Cash</option>-->
<!--                            <option value="Card">Card</option>-->
<!--                            <option value="Online">Online</option>-->
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Payment Status</label>
                        <select class="form-control" id="paymentStatus">
                        <option value=""></option>
<!--                            <option value="Pending">Pending</option>-->
<!--                            <option value="Completed">Completed</option>-->
<!--                            <option value="Failed">Failed</option>-->
                        </select>
                    </div>
                </div>
            </div>
        </form>
    `;
}

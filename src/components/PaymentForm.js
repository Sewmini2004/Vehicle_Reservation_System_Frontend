export function PaymentForm() {
    return `
        <form id="paymentForm" class="container">
            <input type="hidden" id="paymentId">
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Total Amount <span class="text-danger">*</span></label>
                        <input type="number" step="0.01" class="form-control" id="totalAmount" required>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Discount Amount <span class="text-danger">*</span></label>
                        <input type="number" step="0.01" class="form-control" id="discountAmount" required>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Tax Amount <span class="text-danger">*</span></label>
                        <input type="number" step="0.01" class="form-control" id="taxAmount" required>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Final Amount <span class="text-danger">*</span></label>
                        <input type="number" step="0.01" class="form-control" id="finalAmount" disabled>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Payment Method <span class="text-danger">*</span></label>
                        <select class="form-control" id="paymentMethod" required>
                            <option value="">Select a Payment Method</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Payment Status <span class="text-danger">*</span></label>
                        <select class="form-control" id="paymentStatus" required>
                            <option value="">Select a Status</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    `;
}

export function CustomerForm() {
    return `
       <form id="customerForm">
            <input type="hidden" id="customerId">
    
            <!-- Row 1: Name, Address, NIC -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Name <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Address <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="address" required>
                </div>
            </div>
    
            <!-- Row 2: Phone Number, Registration Date, Email -->
            <div class="row">
              <div class="col-md-6 mb-3">
                    <label class="form-label">NIC <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="nic" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Phone Number <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="phoneNumber" required>
                </div>
            </div>
              
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Registration Date <span style="color: red">*</span></label>
                    <input type="date" class="form-control " id="registrationDate" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Email <span style="color: red">*</span></label>
                    <input type="email" class="form-control" id="email" required>
                </div>
            </div>
       </form>
    `;
}

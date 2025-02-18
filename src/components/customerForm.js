export function CustomerForm() {
    return `
        <form id="customerForm">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Address</label>
                <input type="text" class="form-control" id="address" required>
            </div>
            <div class="mb-3">
                <label class="form-label">NIC</label>
                <input type="text" class="form-control" id="nic" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="phoneNumber" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Registration Date</label>
                <input type="date" class="form-control" id="registrationDate" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
        </form>
    `;
}

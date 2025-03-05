export function RegisterForm() {
    return `
       <form id="userForm">
            <input type="hidden" id="userId">
    
            <!-- Row 1: Username, Password -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required>
                </div>
            </div>
    
            <!-- Row 2: First Name, Last Name -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" required>
                </div>
            </div>

            <!-- Row 3: Email -->
            <div class="row">
                <div class="col-md-12 mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
            </div>
       </form>
    `;
}

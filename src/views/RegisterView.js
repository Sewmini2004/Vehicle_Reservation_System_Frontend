import { RegisterForm } from "../components/RegisterForm.js";

export default function RegisterView() {
    return `
     <div class="container-fluid" style="padding: 2.26rem;">
        <div class="col-md">
            <div class="card">
                <div class="card-header" style="font-size: 14px; font-weight: 525;">
                    <h4>User Registration Form</h4>
                </div>

                <div class="card-body">
                    <button type="button" class="btn btn-success" id="registerUserBtn">
                        <i class="fas fa-user-plus"></i> Register User
                    </button>
                </div>
            </div>
        </div>
       
        <!-- User Modal (Registration Form) -->
        <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userModalLabel">Register User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${UserForm()}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="saveUserBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

import CustomerView from "../views/customerView.js";

export function CustomerController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = CustomerView();
    loadCustomers();  // Fetch and display customer data

    // Open modal for adding new customer
    document.getElementById("addCustomerBtn").addEventListener("click", () => {
        document.getElementById("customerModalLabel").innerText = "Add Customer";
        document.getElementById("customerForm").reset();
        document.getElementById("customerId").value = "";
        new bootstrap.Modal(document.getElementById("customerModal")).show();
    });

    // Save or Update Customer
    document.getElementById("saveCustomerBtn").addEventListener("click", async () => {
        const customerId = document.getElementById("customerId").value;
        const customer = {
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            nic: document.getElementById("nic").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            registrationDate: document.getElementById("registrationDate").value,
            email: document.getElementById("email").value
        };

        if (customerId) {
            // Update customer
            await fetch(`/api/customers/${customerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });
        } else {
            // Add new customer
            await fetch("/api/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });
        }

        loadCustomers();  // Refresh table
        bootstrap.Modal.getInstance(document.getElementById("customerModal")).hide();
    });
}

// Load customers dynamically
async function loadCustomers() {
    const response = await fetch("/api/customers");
    const customers = await response.json();
    const tableBody = document.getElementById("customerTableBody");

    tableBody.innerHTML = customers.map(customer => `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.nic}</td>
            <td>${customer.phoneNumber}</td>
            <td>${customer.registrationDate}</td>
            <td>${customer.email}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn" onclick="editCustomer('${customer.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-btn" onclick="deleteCustomer('${customer.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join("");
}

// Delete customer
async function deleteCustomer(id) {
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    loadCustomers(); // Refresh table
}

// Edit customer
function editCustomer(id) {
    fetch(`/api/customers/${id}`)
        .then(response => response.json())
        .then(customer => {
            document.getElementById("customerId").value = customer.id;
            document.getElementById("name").value = customer.name;
            document.getElementById("address").value = customer.address;
            document.getElementById("nic").value = customer.nic;
            document.getElementById("phoneNumber").value = customer.phoneNumber;
            document.getElementById("registrationDate").value = customer.registrationDate;
            document.getElementById("email").value = customer.email;

            new bootstrap.Modal(document.getElementById("customerModal")).show();
        });
}

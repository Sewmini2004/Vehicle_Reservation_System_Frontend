import CustomerView from "../views/customerView.js";
export function CustomerController() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = CustomerView();  // Load customer view
    loadCustomers();  // Fetch and display customer data

    // Open modal for adding a new customer
    document.getElementById("addCustomerBtn").addEventListener("click", () => {
        console.log("Opening Add Customer Modal");
        document.getElementById("customerModalLabel").innerText = "Add Customer";
        document.getElementById("customerForm").reset();
        document.getElementById("customerId").value = "";
        new bootstrap.Modal(document.getElementById("customerModal")).show();
    });

    // Save or Update Customer
    document.getElementById("saveCustomerBtn").addEventListener("click", async () => {
        const customerId = document.getElementById("customerId").value;
        const customer = {
            customerId:customerId ? parseInt(customerId) : 0,
            userId:1,
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            nic: document.getElementById("nic").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            registrationDate: document.getElementById("registrationDate").value,
            email: document.getElementById("email").value,
        };

        try {
            let response;
            if (customerId) {
                // Update existing customer
                response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer?customerId=${customerId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(customer),
                });
            } else {
                // Add new customer
                response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(customer),
                });
            }

            const result = await response.json();
            if (response.ok) {
                alert("Customer data saved successfully!");
                loadCustomers();  // Refresh customer table
                bootstrap.Modal.getInstance(document.getElementById("customerModal")).hide();  // Close modal
            } else {
                alert(`Failed to save customer data: ${result.message}`);
            }
        } catch (error) {
            console.error("Error saving customer:", error);
            alert("An error occurred while saving data.");
        }
    });

}


// Load customers dynamically
window.loadCustomers = async function loadCustomers() {
    console.log("Loading customer data...");
    try {
        const response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer");

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the JSON data
        const customers = await response.json();  // Parse the JSON response

        console.log("Customers fetched successfully:");
        console.log(customers);

        const tableBody = document.getElementById("customerTableBody");
        tableBody.innerHTML = "";  // Clear previous data

        customers.forEach(customer => {
            let editBtn = '';
            let deleteBtn = '';


                editBtn = `<a href="javascript:void(0)" id="edit" class="btn btn-warning btn-sm edit-btn" title="Edit" onclick="editCustomer(${customer.customerId})" data-bs-toggle="modal"><i class="fa fa-edit"></i></a>`;
                deleteBtn = `<a href="javascript:void(0)" id="delete" class="btn btn-danger btn-sm delete-btn" onclick="deleteCustomer(${customer.customerId})" title="delete"><i class="fa fa-trash"></i></a>`;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.nic}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.registrationDate}</td>
                <td>${customer.email}</td>
                <td class="table-border-right">
                    <center>
                        ${editBtn}
                        ${deleteBtn}
                    </center>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading customers:", error);
        alert("An error occurred while loading customer data.");
    }
}



// Edit customer

window.editCustomer = async function editCustomer(id) {
    console.log("Editing customer with ID:", id);
    try {
        // Fetch the list of all customers
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer`);

        // Parse the JSON response
        const customers = await response.json();
        console.log("Fetched customer data: ");
        console.log(customers);

        // Find the customer by matching the customerId
        const customer = customers.find(customer => customer.customerId === id);

        if (!customer) {
            // If no customer is found with the given id
            console.error("Customer not found");
            alert("Customer not found!");
            return;
        }

        // Now populate the form with the found customer data
        document.getElementById("customerId").value = customer.customerId;
        document.getElementById("name").value = customer.name;
        document.getElementById("address").value = customer.address;
        document.getElementById("nic").value = customer.nic;
        document.getElementById("phoneNumber").value = customer.phoneNumber;
        document.getElementById("registrationDate").value = customer.registrationDate;
        document.getElementById("email").value = customer.email;

        // Update modal label to "Edit Customer"
        document.getElementById("customerModalLabel").innerText = "Edit Customer";

        // Show the modal
        new bootstrap.Modal(document.getElementById("customerModal")).show();
    } catch (error) {
        console.error("Error fetching customer data for edit:", error);
        alert("Failed to load customer data for editing.");
    }
}



// Delete customer
 window.deleteCustomer = async function deleteCustomer(id) {
    const confirmDelete = confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer?customerId=${id}`, { method: "DELETE" });
            const result = await response.json();
            if (response.ok) {
                alert("Customer deleted successfully!");
                loadCustomers();  // Refresh table after deletion
            } else {
                alert(`Failed to delete customer: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting customer:", error);
            alert("An error occurred while deleting data.");
        }
    }
}



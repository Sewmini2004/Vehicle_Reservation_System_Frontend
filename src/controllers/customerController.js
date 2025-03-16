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

    // Enable or disable save button based on form validation
    document.getElementById("customerForm").addEventListener("input", () => {
        const saveBtn = document.getElementById("saveCustomerBtn");
        const form = document.getElementById("customerForm");
        // Check if the form is valid
        if (form.checkValidity()) {
            saveBtn.disabled = false;
        } else {
            saveBtn.disabled = true;
        }
    });

    // Save or Update Customer
    document.getElementById("saveCustomerBtn").addEventListener("click", async () => {
        const customerId = document.getElementById("customerId").value;
        const customer = {
            customerId: customerId ? parseInt(customerId) : 0,
            userId: 1,
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            nic: document.getElementById("nic").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            registrationDate: document.getElementById("registrationDate").value,
            email: document.getElementById("email").value,
        };

        try {
            let response;
            let successMessage = ""; // This will hold the success message based on the action (add or update)

            if (customerId) {
                // Update existing customer
                response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer?customerId=${customerId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(customer),
                });
                successMessage = "Customer updated successfully!"; // Success message for update
            } else {
                // Add new customer
                response = await fetch("http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(customer),
                });
                successMessage = "Customer added successfully!"; // Success message for save
            }

            if (!response.ok) {
                const errorMessage = await response.text(); // Get the response body (it might be HTML or JSON)
                throw new Error(`Error: ${errorMessage}`);
            }

            // Parse the response body as JSON
            const result = await response.json();

            // If the response is successful, show the success message and refresh the table
            alert(successMessage);
            loadCustomers();  // Refresh customer table
            bootstrap.Modal.getInstance(document.getElementById("customerModal")).hide();  // Close modal

        } catch (error) {
            console.error("Error saving customer:", error);
            alert(`An error occurred: ${error.message}`);  // Show the error message in the alert
        }
    });

    // Search customer by name or email with debounce
    let debounceTimer;
    document.getElementById("searchCustomer").addEventListener("input", async (event) => {
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            loadCustomers(searchTerm);
        }, 500);
    });
}

// Load customers dynamically with optional search term
window.loadCustomers = async function loadCustomers(searchTerm = '') {
    console.log("Loading customer data...");
    try {
        const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer?search=${searchTerm}`);

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

        // If no customers are found, display a "No customers found" message
        if (customers.length === 0) {
            const noResultsRow = document.createElement("tr");
            noResultsRow.innerHTML = `<td colspan="7" style="text-align: center;">No customers found</td>`;
            tableBody.appendChild(noResultsRow);
        } else {
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
        }

    } catch (error) {
        console.error("Error loading customers:", error);
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
            const response = await fetch(`http://localhost:8091/Vehicle_Reservation_System_Backend_war/customer?customerId=${id}`, {
                method: "DELETE",
            });

            // Check if the response is successful
            if (!response.ok) {
                const result = await response.json(); // Parse the JSON response
                throw new Error(result.Error || "An error occurred while deleting customer.");
            }

            // Parse the success message from the response
            const result = await response.json();
            alert(result.message || "Customer deleted successfully!");

            // Refresh customer table after deletion
            loadCustomers();  // Refresh the table

        } catch (error) {
            console.error("Error deleting customer:", error);
            alert(`An error occurred: ${error.message}`); // Show the error message in the alert
        }
    }
}


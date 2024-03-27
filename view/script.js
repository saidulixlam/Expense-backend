// Function to fetch appointments and render the table
function renderAppointmentsTable() {
  axios.get("http://localhost:3000/expenses")
    .then((response) => {
      const appointments = response.data;
      const table = document.createElement("table");
      const tableHeader = `
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Action</th>
        </tr>`;
      let tableBody = "";

      // Loop through each appointment and create table rows
      appointments.forEach((appointment) => {
        tableBody += `
          <tr>
            <td>${appointment.name}</td>
            <td>${appointment.price}</td>
            <td>${appointment.description}</td>
            <td><button onclick="deleteAppointment('${appointment.id}')">Delete</button></td>
          </tr>`;
      });

      // Add table header and body to the table
      table.innerHTML = tableHeader + tableBody;

      // Clear previous table content
      const output = document.getElementById("output");
      output.innerHTML = "";
      
      // Display the table on the page
      output.appendChild(table);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching appointments.");
    });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  const user = {
    name,
    price,
    description
  };
  console.log(user);

  axios.post("http://localhost:3000/expenses", user)
    .then((response) => {
      console.log(response.data);
      // After adding the appointment, render the updated appointments table
      renderAppointmentsTable();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

// Function to delete an appointment
function deleteAppointment(id) {
  axios.delete(`http://localhost:3000/expenses/${id}`)
    .then(() => {
      // After deleting the appointment, render the updated appointments table
      renderAppointmentsTable();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the appointment.",error);
    });
}

// Add event listener for form submission
document.getElementById("bookingForm").addEventListener("submit", handleFormSubmission);

// Initially render appointments table when the page loads
renderAppointmentsTable();

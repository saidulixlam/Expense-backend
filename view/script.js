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

      appointments.forEach((appointment) => {
        tableBody += `
          <tr>
            <td>${appointment.name}</td>
            <td>${appointment.price}</td>
            <td>${appointment.description}</td>
            <td>
              <button onclick="deleteAppointment('${appointment.id}')">Delete</button>
              <button onclick="editAppointment('${appointment.id}', '${appointment.name}', '${appointment.price}', '${appointment.description}')">Edit</button>
            </td>
          </tr>`;
      });

      table.innerHTML = tableHeader + tableBody;
      const output = document.getElementById("output");
      output.innerHTML = "";
      output.appendChild(table);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching appointments.");
    });
}

function handleFormSubmission(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const user = { name, price, description };
  const submitButton = document.getElementById("btn");
  if (submitButton.value === 'Add Appointment') {
    axios.post("http://localhost:3000/expenses", user)
      .then(() => {
        resetForm();
        renderAppointmentsTable();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  }
}

function deleteAppointment(id) {
  axios.delete(`http://localhost:3000/expenses/${id}`)
    .then(() => {
      renderAppointmentsTable();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the appointment.", error);
    });
}

function editAppointment(id, name, price, description) {
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("description").value = description;
  const submitButton = document.getElementById("btn");
  submitButton.value = 'Update Appointment';
  submitButton.onclick = function () {
    updateAppointment(id);
  };
}

async function updateAppointment(id) {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const user = { name, price, description };

  await axios.put(`http://localhost:3000/expenses/${id}`, user)
    .then(() => {
      renderAppointmentsTable();
      resetForm();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while updating the appointment.", error);
    });
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";

  const submitButton = document.getElementById("btn");
  submitButton.value = 'Add Appointment';
}

document.getElementById("bookingForm").addEventListener("submit", handleFormSubmission);
renderAppointmentsTable();


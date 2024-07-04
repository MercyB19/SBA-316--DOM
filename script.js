document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the dropdown menu
  document
    .getElementById("listCategories")
    .addEventListener("change", function () {
      // Get the name of the chosen category
      let selectedCategory = this.options[this.selectedIndex].text;
      console.log("Category selected:", selectedCategory);

      // Put the selected category name in the categoryHeader area
      let categoryHeader = document.getElementById("categoryHeader");
      console.log("Category header element:", categoryHeader);
      categoryHeader.innerHTML = `<h2>${selectedCategory}</h2>`;

      // Create5 empty boxes and put them in the listInputs area
      let listInputs = document.getElementById("listInputs");
      console.log("List inputs element:", listInputs);
      listInputs.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.placeholder = "Enter new task";
        inputBox.id = `${selectedCategory.toLowerCase()}TaskInputs${i}`;
        inputBox.name = `${selectedCategory.toLowerCase()}TaskInputs${i}`;
        inputBox.style.display = "block";
        inputBox.style.margin = "10px 0";
        console.log("Appending input box:", inputBox);
        listInputs.appendChild(inputBox);
      }
      console.log("All input boxes appended");
    });
});
// Function to add new input box
function addNewInput() {
  // Get the selected category
  const listCategoriesElement = document.getElementById("listCategories");
  let listCategory =
    listCategoriesElement.options[listCategoriesElement.selectedIndex].value;

  // Make sure category is selected
  if (!listCategory) {
    alert("Please select a category");
    return;
  }

  // Get the listInputs div
  const listInputs = document.getElementById("listInputs");

  // Count the number of existing input boxes
  const inputCount = listInputs.querySelectorAll("input").length;

  // Create a new input box
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = "Enter new task";
  newInput.id = `${listCategory.toLowerCase()}TaskInputs${inputCount}`;
  newInput.name = `${listCategory.toLowerCase()}TaskInputs${inputCount}`;
  newInput.style.display = "block";
  newInput.style.margin = "10px 0";

  // Append new input box to listInputs div
  listInputs.appendChild(newInput);
}

// Function to add a new task
function toDoList() {
  const listCategory = document.getElementById('listCategories').value;
  const taskInputs = document.querySelectorAll('#listInputs input');

  let valid = true;

  taskInputs.forEach(input => {
      const task = input.value.trim();
      if (task === '') {
          valid = false;
          input.style.border = '1px solid red'; // Highlight empty fields
      } else {
          input.style.border = ''; // Reset the border for non-empty fields
      }
  });

  if (!valid) {
      alert('Please fill out all task fields.');
      return;
  }

  taskInputs.forEach(input => {
      const task = input.value.trim();
      if (task !== '') {
          // Create a new list item for the task
          const taskItem = document.createElement('li');
          taskItem.textContent = `${listCategory}: ${task}`;
          document.getElementById('taskList').appendChild(taskItem);
          input.value = ''; // Clear the input field
      }
  });
}

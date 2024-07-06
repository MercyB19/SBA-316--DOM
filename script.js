document.addEventListener('DOMContentLoaded', function() {
  // Add an event listener to the dropdown menu
  document.getElementById('listCategories').addEventListener('change', function() {
      // Get the name of the chosen category
      let selectedCategory = this.options[this.selectedIndex].text;
      console.log('Category selected:', selectedCategory);

      // Put the selected category name in the categoryHeader area
      let categoryHeader = document.getElementById('categoryHeader');
      console.log('Category header element:', categoryHeader);
      categoryHeader.innerHTML = `<h2>${selectedCategory}</h2>`;

      // Create and append input fields
      let listInputs = document.getElementById('listInputs');
      console.log('List inputs element:', listInputs);
      listInputs.innerHTML = ''; // Clear previous input fields
      createInputFields(selectedCategory);
  });
});

// Function to create and append input fields using DocumentFragment
function createInputFields(category) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 5; i++) {
      const inputBox = document.createElement('input');
      inputBox.type = 'text';
      inputBox.placeholder = 'Enter new task';
      inputBox.id = `${category.toLowerCase()}TaskInput${i}`;
      inputBox.name = `${category.toLowerCase()}TaskInput${i}`;
      inputBox.style.display = 'block';
      inputBox.style.margin = '10px 0';
      fragment.appendChild(inputBox);
  }
  document.getElementById('listInputs').appendChild(fragment);
}

// Function to add a new input box
function addNewInput() {
  // Get the selected category
  const listCategoriesElement = document.getElementById('listCategories');
  let listCategory = listCategoriesElement.options[listCategoriesElement.selectedIndex].value;

  // Ensure a category is selected
  if (!listCategory) {
      alert('Please select a category');
      return;
  }

  // Get the listInputs div
  const listInputs = document.getElementById('listInputs');

  // Validate existing input fields
  const existingInputs = listInputs.querySelectorAll('input');
  for (let i = 0; i < existingInputs.length; i++) {
      if (existingInputs[i].value.trim() === '') {
          alert('Please fill out all existing task fields before adding a new one.');
          existingInputs[i].style.border = '1px solid red'; // Highlight empty field
          return;
      } else {
          existingInputs[i].style.border = ''; // Reset the border for non-empty fields
      }
  }

  // Count the number of existing input boxes
  const inputCount = existingInputs.length;

  // Create a new input box
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.placeholder = 'Enter new task';
  newInput.id = `${listCategory.toLowerCase()}TaskInput${inputCount}`;
  newInput.name = `${listCategory.toLowerCase()}TaskInput${inputCount}`;
  newInput.style.display = 'block';
  newInput.style.margin = '10px 0';

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
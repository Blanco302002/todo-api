// base URL of our REST API (same server that serves this page, so no need for http://localhost:8080)
const API_URL = '/api/tasks';

// grab the HTML elements we need, by their id
const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const taskList = document.getElementById('task-list');
const errorBox = document.getElementById('error');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');

// id of the task being edited, or null when the form is creating a new task
let editingId = null;

// READ: GET /api/tasks and draw the list
async function loadTasks() {
    const response = await fetch(API_URL);   // by default fetch does a GET
    const tasks = await response.json();     // the body is JSON: an array of {id, title, description}

    taskList.innerHTML = '';                 // clear the list before drawing it again

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="list-group-item text-muted">No tasks yet.</li>';
        return;
    }

    for (const task of tasks) {
        taskList.appendChild(createTaskItem(task));
    }
}

// builds one <li> for a task
function createTaskItem(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';

    const text = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'fw-bold';
    // textContent (not innerHTML) so whatever the user typed is shown as text, never run as HTML
    title.textContent = task.title;
    const description = document.createElement('small');
    description.className = 'text-muted';
    description.textContent = task.description ?? '';
    text.append(title, description);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-sm btn-outline-primary';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => startEditing(task));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-outline-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    // wrap both buttons so they sit together on the right (gap-2 = small space between them)
    const buttons = document.createElement('div');
    buttons.className = 'd-flex gap-2';
    buttons.append(editButton, deleteButton);

    li.append(text, buttons);
    return li;
}

// the form submit does CREATE or UPDATE, depending on whether we're editing
async function saveTask(event) {
    event.preventDefault();                  // stop the form from reloading the page

    const isEditing = editingId !== null;
    // CREATE: POST /api/tasks          UPDATE: PUT /api/tasks/{id}
    const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: titleInput.value,
            description: descriptionInput.value
        })
    });

    if (!response.ok) {                      // 400, 404, 500...
        const error = await response.json(); // our GlobalExceptionHandler sends {status, message}
        showError(error.message);
        return;
    }

    hideError();
    stopEditing();                           // empty the inputs and go back to "create" mode
    loadTasks();                             // redraw the list with the changes
}

// fills the form with the task and switches it to "edit" mode
function startEditing(task) {
    editingId = task.id;
    titleInput.value = task.title;
    descriptionInput.value = task.description ?? '';
    submitButton.textContent = 'Save';
    cancelButton.classList.remove('d-none');
    titleInput.focus();
}

// empties the form and switches it back to "create" mode
function stopEditing() {
    editingId = null;
    form.reset();
    submitButton.textContent = 'Add';
    cancelButton.classList.add('d-none');
    hideError();
}

// DELETE: DELETE /api/tasks/{id}
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (id === editingId) {                  // deleted the task we were editing
        stopEditing();
    }
    loadTasks();
}

function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove('d-none');
}

function hideError() {
    errorBox.classList.add('d-none');
}

// wire everything up when the page loads
form.addEventListener('submit', saveTask);
cancelButton.addEventListener('click', stopEditing);
loadTasks();

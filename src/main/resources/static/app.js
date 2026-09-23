// base URL of our REST API (same server that serves this page, so no need for http://localhost:8080)
const API_URL = '/api/tasks';

// grab the HTML elements we need, by their id
const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const taskList = document.getElementById('task-list');
const errorBox = document.getElementById('error');

// READ: GET /api/tasks and draw the list
async function loadTasks() {
    const response = await fetch(API_URL);   // by default fetch does a GET
    const tasks = await response.json();     // the body is JSON: an array of {id, title, description}

    taskList.innerHTML = '';                 // clear the list before drawing it again

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="list-group-item text-muted">No hay tareas todavía</li>';
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

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-outline-danger';
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    li.append(text, deleteButton);
    return li;
}

// CREATE: POST /api/tasks with the form data as JSON
async function createTask(event) {
    event.preventDefault();                  // stop the form from reloading the page

    const response = await fetch(API_URL, {
        method: 'POST',
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
    form.reset();                            // empty the inputs
    loadTasks();                             // redraw the list with the new task
}

// DELETE: DELETE /api/tasks/{id}
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
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
form.addEventListener('submit', createTask);
loadTasks();

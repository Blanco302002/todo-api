package com.github.facundoblanco.todoapi.rest;

import com.github.facundoblanco.todoapi.entity.Task;
import com.github.facundoblanco.todoapi.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// every method here returns DATA (converted to JSON), not HTML pages
@RestController
// prefix for every endpoint in this class: all URLs start with /api/tasks
@RequestMapping("/api/tasks")
public class TaskRestController {

    private final TaskService taskService;

    public TaskRestController(TaskService taskService) {
        this.taskService = taskService;
    }

    // GET /api/tasks -> list all tasks
    @GetMapping
    public List<Task> getTasks() {
        return taskService.findAll();
    }

    // GET /api/tasks/5 -> one task
    @GetMapping("/{taskId}")
    public Task getTask(@PathVariable int taskId) {
        return taskService.findById(taskId);
    }

    // POST /api/tasks -> create a task from the JSON in the request body
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task addTask(@Valid @RequestBody Task task) {
        // in case the JSON includes an id, force 0 so JPA inserts instead of updating
        task.setId(0);
        return taskService.save(task);
    }

    // PUT /api/tasks/5 -> update task 5 with the JSON in the request body
    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable int taskId, @Valid @RequestBody Task task) {
        // make sure it exists (404 otherwise), then use the id from the URL
        taskService.findById(taskId);
        task.setId(taskId);
        return taskService.save(task);
    }

    // DELETE /api/tasks/5 -> delete task 5, answers 204 No Content (empty body)
    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable int taskId) {
        taskService.deleteById(taskId);
    }
}

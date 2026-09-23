package com.github.facundoblanco.todoapi.service;

import com.github.facundoblanco.todoapi.dao.TaskRepository;
import com.github.facundoblanco.todoapi.entity.Task;
import com.github.facundoblanco.todoapi.exception.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service tells Spring to create this object and make it available for injection
@Service
public class TaskServiceImpl implements TaskService {

    // define Repository instance to work with
    private final TaskRepository taskRepository;

    // constructor injection: Spring sees we need a TaskRepository and passes the one it created.
    // with a single constructor, @Autowired is optional.
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task findById(int id) {
        // findById returns an Optional: the task may or may not exist
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteById(int id) {
        // check it exists first, so we answer 404 instead of silently doing nothing
        findById(id);
        taskRepository.deleteById(id);
    }
}

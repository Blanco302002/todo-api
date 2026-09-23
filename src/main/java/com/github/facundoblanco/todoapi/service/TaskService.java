package com.github.facundoblanco.todoapi.service;

import com.github.facundoblanco.todoapi.entity.Task;

import java.util.List;

public interface TaskService {

    // find tasks
    List<Task> findAll();

    // find one task (throws TaskNotFoundException if it doesn't exist)
    Task findById(int id);

    // save changes (insert if id == 0, update otherwise)
    Task save(Task task);

    // delete
    void deleteById(int id);

}

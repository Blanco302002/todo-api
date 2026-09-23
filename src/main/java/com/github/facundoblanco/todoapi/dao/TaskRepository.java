package com.github.facundoblanco.todoapi.dao;

import com.github.facundoblanco.todoapi.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    // that's all for now
}

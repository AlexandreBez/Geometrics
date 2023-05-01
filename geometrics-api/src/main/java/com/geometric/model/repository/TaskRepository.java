package com.geometric.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.geometric.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{

	@Query(value = "SELECT * FROM tasks", nativeQuery = true)
	List<Task> getAllTasks();
	
}

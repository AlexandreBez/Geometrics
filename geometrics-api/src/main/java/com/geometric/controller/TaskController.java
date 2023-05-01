package com.geometric.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.geometric.model.Task;
import com.geometric.services.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@GetMapping("/getAllTasks")
	public ResponseEntity<List<Task>> getAllTasks(){
		return taskService.getAllTasks();
	}
	
	@PostMapping("/createTask")
	public ResponseEntity<Task> createTask(@RequestBody Task task){
		return taskService.createTask(task);
	}
	
	@GetMapping("/task/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable("id") Integer id) {
		return taskService.getTaskById(id);
	}
	
	@PutMapping("/updateTask/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task task){
		return taskService.updateTask(id, task);
	}
	
	@DeleteMapping("/deleteTask/{id}")
	public ResponseEntity<HttpStatus> deleteTask(@PathVariable Integer id){
		return taskService.deleteTask(id);
	}
}

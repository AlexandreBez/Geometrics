package com.geometric.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.geometric.model.Task;
import com.geometric.model.repository.TaskRepository;

@Service
public class TaskService {

	@Autowired
	TaskRepository taskRepository;

	/**
	 * @author Lucas Get all the tasks by running the @Query using on taskRepository
	 */
	public ResponseEntity<List<Task>> getAllTasks() {
		// try to find the taskData and if is null will send a No Content status or if
		// we fall on an error will send a null data and send and Internal Server Error
		// status
		try {
			List<Task> taskData = taskRepository.findAll();

			if (taskData.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(taskData, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Task> createTask(Task task) {
		try {
			// Create task and send a CREATED status
			Task _task = taskRepository.save(
					new Task(task.getTask(), task.getPriority())
			);
			return new ResponseEntity<>(_task, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Task> getTaskById(Integer id) {
		try {
			// try to find the data and if not found will send the status NOT_FOUND
			Optional<Task> taskData = taskRepository.findById(id);

			if (taskData.isPresent()) {
				return new ResponseEntity<>(taskData.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Task> updateTask(Integer id, Task task) {

		try {
			// find the task by the ID
			Optional<Task> taskData = taskRepository.findById(id);

			// if exist will update by the request param sended by the JSON and update
			if (taskData.isPresent()) {
				Task _taskData = taskData.get();
				_taskData.setTask(task.getTask());
				_taskData.setPriority(task.getPriority());
				return new ResponseEntity<>(taskRepository.save(_taskData), HttpStatus.OK);
			} else {
				// if the data is empty(Not found) will return the status NOT_FOUND
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<HttpStatus> deleteTask(Integer id) {
		try {
			// find if the task exist
			Optional<Task> taskData = taskRepository.findById(id);

			// if exist will delete the task by id and send a OK status
			// otherwilse will send a NO_CONTENT status
			if (taskData.isPresent()) {
				taskRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

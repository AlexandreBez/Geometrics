package com.geometric.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
    private Integer task_id;

	@Column(name = "task", nullable = false)
	private String task;
    
    @Column(nullable = false)
    private String priority;
    
    public Task(String task, String priority) {
		this.task = task;
		this.priority = priority;
	}

    public Task() {}
    
	public int getTask_id() {
		return task_id;
	}

	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	@Override
	public String toString() {
		return "Task [task_id=" + task_id + ", task=" + task + ", priority=" + priority + "]";
	}
    
}

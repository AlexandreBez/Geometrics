import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getAllTasks():  Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8080/getAllTasks');
  }

  getTaskById(id: number):  Observable<Task> {
    return this.http.get<Task>('http://localhost:8080/task/'+id);
  }

  saveTask(task: string, priority: string): Observable<Task> {
    let createdTask: Task = {
        task: task,
        priority: priority
    }
    return this.http.post<Task>('http://localhost:8080/createTask',createdTask);
  }

  updateTask(id: number, task: string, priority: string): Observable<Task> {
    let updatedTask: Task = {
        task: task,
        priority: priority
    }
    return this.http.put<Task>('http://localhost:8080/updateTask/'+id, updatedTask);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>('http://localhost:8080/deleteTask/'+id);
  }
}

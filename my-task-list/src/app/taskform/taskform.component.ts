import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { TaskService } from '../server/service/task.service';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css'],
})
export class TaskformComponent implements OnInit {

  // Updated task Form variables
  task_id: number = null;

  updatedErrorMessage = null;
  updatedSuccessMessage = null;

  _taskLoaded: any;
  _priorityLoaded: any;
  loadedTask: any;

  @ViewChild('updateForm')
  updateForm!: NgForm;

  // Create task Form variables
  loadedTasks: any;
  errorMessage = null;
  successMessage = null;

  @ViewChild('taskForm')
  taskForm!: NgForm;

  defaultTaskValue = null;
  defaultPriorityValue = 'Low';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.loadedTasks = this.taskService.getAllTasks()
      .pipe(
        map((responseData) => {
          return responseData.map((tasks) => {
            return { ...tasks };
          });
        })
      )
      .subscribe(
        (data) => {
          this.loadedTasks = data;
          console.log(data);
        },
        (error) => {
          switch (error.error.status) {
            case 204:
              this.loadedTasks = null;
              console.log(error);
              return (this.errorMessage = 'You have no task created....');
            case 500:
              this.loadedTasks = null;
              console.log(error);
              return (this.errorMessage =
                'Opss...Something is not working but we will fix soon. Please try again later');
            default:
              this.loadedTasks = null;
              console.log(error);
              return (this.errorMessage =
                'Opss...Something is not working but we will fix soon. Please try again later');
          }
        }
      );
  }

  saveTask() {
    let task = this.taskForm.value.task;
    let priority = this.taskForm.value.priority;

    this.taskService.saveTask(task, priority).subscribe(
      (data) => {
        this.successMessage = 'Task created with success...';
        setTimeout(() => {
          this.successMessage = null;
        }, 2000);
        console.log(data);
        this.getAllTasks();
      },
      (error) => {
        switch (error.error.status) {
          case 500:
            this.loadedTasks = null;
            console.log(error);
            return (this.errorMessage =
              'Opss...Something is not working but we will fix soon. Please try again later');
          default:
            this.loadedTasks = null;
            console.log(error);
            return (this.errorMessage =
              'Opss...Something is not working but we will fix soon. Please try again later');
        }
      }
    );

    this.defaultTaskValue = null;
    this.defaultPriorityValue = 'Low';
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      (data) => {
        this.successMessage = 'Task deleted with success...';
        console.log(data);
        setTimeout(() => {
          this.successMessage = null;
        }, 2000);
        this.getAllTasks();
      },
      (error) => {
        switch (error.error.status) {
          case 204:
            this.loadedTasks = null;
            console.log(error);
            return (this.errorMessage =
              'Opss...This task dont exist anymore....');
          case 500:
            this.loadedTasks = null;
            console.log(error);
            return (this.errorMessage =
              'Opss...Something is not working but we will fix soon. Please try again later');
          default:
            this.loadedTasks = null;
            console.log(error);
            return (this.errorMessage =
              'Opss...Something is not working but we will fix soon. Please try again later');
        }
      }
    );
  }

  sendIdForUpdated(id: number) {
    this.task_id = id;
    this.getTaskById();
  }

  getTaskById() {
    this.loadedTask = this.taskService
      .getTaskById(this.task_id)
      .pipe(
        map((responseData) => {
          this._taskLoaded = responseData.task;
          this._priorityLoaded = responseData.priority;
          return responseData;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          switch (error.error.status) {
            case 404:
              this.loadedTask = null;
              console.log(error);
              return (this.updatedErrorMessage =
                'Sorry but this task dont exist anymore....');
            case 500:
              this.loadedTask = null;
              console.log(error);
              return (this.updatedErrorMessage =
                'Opss...Something is not working but we will fix soon. Please try again later');
            default:
              this.loadedTask = null;
              console.log(error);
              return (this.updatedErrorMessage =
                'Opss...Something is not working but we will fix soon. Please try again later');
          }
        }
      );
  }

  updatedTask() {
    let updated_task = this.updateForm.value.updated_task;
    let updated_priority = this.updateForm.value.updated_priority;

    this.taskService
      .updateTask(this.task_id, updated_task, updated_priority)
      .subscribe(
        (data) => {
          this.updatedSuccessMessage = 'Task updated with success...';
          console.log(data);
          setTimeout(() => {
            this.updatedSuccessMessage = null;
            this.task_id = null;
            this.getAllTasks();
          }, 2000);
        },
        (error) => {
          switch (error.error.status) {
            case 500:
              console.log(error);
              return (this.updatedErrorMessage =
                'Opss...Something is not working but we will fix soon. Please try again later');
            default:
              console.log(error);
              return (this.updatedErrorMessage =
                'Opss...Something is not working but we will fix soon. Please try again later');
          }
        }
      );
  }

  cancelUpdate() {
    this.task_id = null;
  }
}

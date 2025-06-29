import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule, CreateTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  title = new FormControl('');
  tasks: Task[] = [];
  editMode: boolean = false;
  editingTaskId?: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (error) => console.error(error),
    });
  }

  addTask(task: Partial<Task>) {
    if (!task.title) return;
    this.tasksService.addTask(task.title).subscribe({
      next: (task) => this.tasks.push(task),
      error: (error) => console.error(error),
    });
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
  }

  startEditMode(taskId: number) {
    const task = this.getTaskById(taskId);
    if (!task) return;
    this.title.setValue(task.title);
    this.editMode = true;
    this.editingTaskId = taskId;
  }

  cancelEditMode() {
    this.editMode = false;
    this.editingTaskId = undefined;
  }

  updateTask(taskId: number) {
    const task = this.getTaskById(taskId);
    if (!task) return;
    task.title = this.title.value || task.title;
    this.cancelEditMode();
  }

  getTaskById(taskId: number) {
    return this.tasks.find((t) => t.id === taskId);
  }
}

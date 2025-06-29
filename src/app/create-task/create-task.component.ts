import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit {
  @Output() createTask = new EventEmitter();
  tasksForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tasksForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  get title() {
    return this.tasksForm.get('title');
  }

  onCreate() {
    this.createTask.emit({
      title: this.tasksForm.value.title,
    });
    this.tasksForm.reset();
  }
}

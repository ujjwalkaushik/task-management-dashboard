import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskService } from 'src/app/services/task.service';
import { formatDate } from 'src/app/utils/date-utils';
import { modalAnimation } from 'src/app/utils/modal.animation';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
    animations: [modalAnimation],
})
export class TaskFormComponent implements OnInit {
    @Input() isVisible = false;
    @Input() task: any = {}; // Replace 'any' with a Task model if available
    @Output() modalClosed = new EventEmitter<boolean>();

    taskForm!: FormGroup;
    isEditFlow = false;
    minDate!: string;

    constructor(private fb: FormBuilder, private taskService: TaskService) {}

    ngOnInit(): void {
        this.minDate = new Date().toISOString().split('T')[0];
        this.isEditFlow = !!this.task?.id;

        this.initializeForm();
    }

    initializeForm(): void {
        const {
            title = '',
            description = '',
            dueDate = '',
            status = '',
        } = this.task || {};

        this.taskForm = this.fb.group({
            title: [title, Validators.required],
            description: [description, Validators.maxLength(60)],
            dueDate: [dueDate ? formatDate(dueDate) : '', Validators.required],
            status: [status],
        });
    }

    close(): void {
        this.modalClosed.emit(false);
    }

    onSaveTask(): void {
        this.markFormGroupTouched(this.taskForm);

        if (this.taskForm.invalid) return;

        const { title, description, dueDate, status } = this.taskForm.value;

        const payload = {
            title,
            description,
            dueDate,
            status: status || 'Pending',
        };

        if (this.isEditFlow) {
            this.taskService.updateTask({ ...payload, id: this.task.id });
        } else {
            this.taskService.addTask({ ...payload, id: crypto.randomUUID() });
        }

        this.modalClosed.emit(true);
    }

    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if ((control as any).controls) {
                this.markFormGroupTouched(control as FormGroup);
            }
        });
    }
}

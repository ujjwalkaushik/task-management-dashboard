import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {

    @Input() task: Task | null = null;
    @Input() isMobile: boolean = false;
    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    
    constructor() {}

    ngOnInit(): void {}

    editTask(task: null | Task) {
        this.onEdit.emit(task);
    }

    deleteTask(task: null | Task) {
        this.onDelete.emit(task);
    }
}

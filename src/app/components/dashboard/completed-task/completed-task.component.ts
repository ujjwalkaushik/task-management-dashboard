import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../../models/task.model';

@Component({
    selector: 'app-completed-task',
    templateUrl: './completed-task.component.html',
    styleUrls: ['./completed-task.component.scss'],
})
export class CompletedTaskComponent implements OnInit {
    allCompletedTaskList: Task[] = [];
    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        this.taskService.getTasks().subscribe((tasks) => {
            this.allCompletedTaskList = tasks.filter((task) => task.status == 'Completed');
        });
    }
}

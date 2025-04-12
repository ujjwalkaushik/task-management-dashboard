import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

type SortableKey = keyof Pick<Task, 'dueDate' | 'status'>;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    
    taskList: Task[] = [];
    showModal: boolean = false;
    taskItem: Task | null = null;
    isMobile = false;

    constructor(
        private taskService: TaskService,
        private breakpointObserver: BreakpointObserver,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.taskService.getTasks().subscribe((tasks) => {
            this.taskList = tasks;
        });

        this.taskService.getModalSubscription().subscribe((task) => {
            this.taskItem = task ? task : null;
            this.showModal = true;
        });

        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
    }

    onAddNewTask(): void {
        this.taskItem = null;
        this.showModal = true;
    }

    handleModalClosed(result: boolean): void {
        this.showModal = false;
        this.taskItem = null;

        if (result) {
            console.log('Modal returned:', result);
            this.router.navigate(['/dashboard/all'])
        }
    }
}

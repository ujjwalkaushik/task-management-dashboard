import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';

type SortableKey = keyof Pick<Task, 'dueDate' | 'status'>;

@Component({
    selector: 'app-task-table',
    templateUrl: './task-table.component.html',
    styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
    @Input() status: string = 'all';
    @Input() taskList: Task[] = [];

    taskListForFilter: Task[] = [];
    sortKey: SortableKey | '' = '';
    sortDirection: 'asc' | 'desc' = 'asc';

    isMobile = false;

    constructor(
        private taskService: TaskService,
        private breakpointObserver: BreakpointObserver,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
    }

    ngOnChanges(): void {
        this.taskListForFilter = this.taskList;
        this.filterTasks(this.status);
    }

    onFilterSelection(status: string) {
        this.filterTasks(status);
    }

    onAddNewTask() {
        this.taskService.showModalSubscription(null);
    }

    onEditTask(task: Task) {
        this.taskService.showModalSubscription(task);
    }

    onDeleteTask(task: Task) {
        this.taskService.removeTask(task.id);
    }

    onSort(key: 'dueDate' | 'status') {
        if (this.sortKey === key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortKey = key;
            this.sortDirection = 'asc';
        }

        this.taskList = this.taskService.sortTasks(
            this.taskList,
            this.sortKey,
            this.sortDirection
        );
    }

    filterTasks(status: string) {
        this.sortKey =  '';
        this.sortDirection = 'asc';
        if (status !== 'all') {
            this.taskList = this.taskListForFilter.filter(
                (task) => task.status === status
            );
        } else {
            this.taskList = this.taskListForFilter;
        }
    }

    completeYourTask() {
        this.router.navigate(['/dashboard/all'])
    }
}

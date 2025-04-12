import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskSummary, SummaryItem } from 'src/app/models/summary.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
    @Input() status: string = 'all';
    @Output() filterSelection = new EventEmitter<string>();
    summary: TaskSummary | null = null;
    summaryItems: SummaryItem[] = [
        {
            label: 'All',
            class: '',
            key: 'all',
            getCount: (summary: any) =>
                summary.pending +
                summary.inProgress +
                summary.completed,
        },
        {
            label: 'Pending Tasks',
            class: '',
            key: 'Pending',
            getCount: (summary: any) => summary.pending,
        },
        {
            label: 'In Progress Tasks',
            class: 'in-progress',
            key: 'In Progress',
            getCount: (summary: any) => summary.inProgress,
        },
        {
            label: 'Completed Tasks',
            class: 'completed',
            key: 'Completed',
            getCount: (summary: any) => summary.completed,
        },
    ];

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        this.taskService.getTasks().subscribe((tasks) => {
            this.summary = tasks.reduce(
                (acc, task) => {
                    switch (task.status) {
                        case 'Pending':
                            acc.pending++;
                            break;
                        case 'In Progress':
                            acc.inProgress++;
                            break;
                        case 'Completed':
                            acc.completed++;
                            break;
                    }
                    return acc;
                },
                { pending: 0, inProgress: 0, completed: 0 }
            );

        });
    }

    onFilerSelection(status: string, count: number) {
        if (count > 0) {  // only apply filter when task with that status is available
            this.filterSelection.emit(status);
        }
    }
}

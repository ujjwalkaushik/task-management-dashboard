export interface TaskSummary {
    pending: number;
    inProgress: number;
    completed: number;
}

export interface SummaryItem {
    label: string;
    class: string;
    key: string;
    getCount: (summary: TaskSummary) => number;
}

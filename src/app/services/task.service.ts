import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    taskList: Task[] = [];

    private tasksSubject = new BehaviorSubject<Task[]>(this.taskList);
    private showModalSubject = new Subject<Task | null>();

    constructor() {
        if (localStorage.getItem('taskList')) {
            this.taskList = JSON.parse(localStorage.getItem('taskList') || '');
            this.tasksSubject.next(this.taskList);
        }
    }

    showModalSubscription(task: Task | null) {
      this.showModalSubject.next(task);
    }

    getModalSubscription(): Observable<Task | null> {
        return this.showModalSubject.asObservable();
    }

    getTasks(): Observable<Task[]> {
        return this.tasksSubject.asObservable();
    }

    addTask(task: Task) {
        this.taskList.push(task);
        this.saveAndEmitChanges();
    }

    removeTask(id: string) {
        this.taskList = this.taskList.filter((task) => {
            return task.id != id;
        });
        this.saveAndEmitChanges();
    }

    updateTask(selectedTask: Task) {
        this.taskList = this.taskList.map((task) => {
            if (task.id == selectedTask.id) {
                return { ...selectedTask };
            } else {
                return task;
            }
        });
        this.saveAndEmitChanges();
    }

    sortTasks(tasks: Task[], key: 'dueDate' | 'status', direction: 'asc' | 'desc') {
      let taskList = tasks.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
    
        if (key === 'dueDate') {
          return direction === 'asc'
            ? new Date(valA).getTime() - new Date(valB).getTime()
            : new Date(valB).getTime() - new Date(valA).getTime();
        } else {
          return direction === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });

      return taskList;
    }

    saveAndEmitChanges() {
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
        this.tasksSubject.next(this.taskList);
    }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TaskFormComponent } from './shared/components/task-form/task-form.component';
import { TaskItemComponent } from './shared/components/task-item/task-item.component';
import { AllTaskComponent } from './components/dashboard/all-task/all-task.component';
import { CompletedTaskComponent } from './components/dashboard/completed-task/completed-task.component';
import { TaskTableComponent } from './shared/components/task-table/task-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    DashboardComponent,
    SummaryComponent,
    TaskItemComponent,
    AllTaskComponent,
    CompletedTaskComponent,
    TaskTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

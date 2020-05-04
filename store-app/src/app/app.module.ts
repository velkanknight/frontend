import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UploadComponent} from './upload/upload.component';


import {LogFormComponent} from './log-form/log-form.component';


import { LogsComponent } from './logs/logs.component';

import { LogsService } from './services/logs.service';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {ChartModule} from 'primeng/chart';


const appRoutes: Routes = [
  
  { path: 'logs', component: LogsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'logs/new', component: LogFormComponent },
  { path: 'logs/:id/edit', component: LogFormComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    NotFoundComponent,
    HomeComponent,
    LogsComponent,
    LogFormComponent,
    UploadComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AutoCompleteModule,
    HttpModule,
    HttpClientModule,
    CalendarModule,
    FileUploadModule,
    ChartModule

  ],
  providers: [LogsService, AutoCompleteModule, BrowserAnimationsModule, HttpClientModule, ChartModule],

  bootstrap: [AppComponent]
})
export class AppModule {}

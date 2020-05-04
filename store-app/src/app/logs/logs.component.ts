import { Component, OnInit, ViewChild } from '@angular/core';

import { LogsService } from '../services/logs.service';
import { Log } from '../models/log';
import { AppError } from '../common/app-error';
import { NgForm } from '@angular/forms';

import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private service: LogsService) { }

  datede: any;
  dateate: any;
  ip = '';
  logs: Log[] = [];
  error: AppError;
  @ViewChild ('f') logForm: NgForm;


  ngOnInit() {

    this.service.getLogs().subscribe(
      (logs) => {
        console.log('Success! Get Logs Successful! (via Observable)');
        console.log(logs.content);
        this.logs = logs.content;
      },
      (error: AppError) => {
        this.error = error;
        console.log(
          'Failed! Error occurred when getting logs. (via Observable)',
          error
        );
      }
    );
  }

  onDelete(logId) {
    if (confirm('Are you sure?')) {
      this.service.deleteLog(logId).subscribe(
        () => {
          console.log('Success! Delete Log Successful!');
          this.logs = this.logs.filter(
            log => log.id !== logId
          );
        },
        (error: AppError) => {
          this.error = error;
          console.log('Failed! Error occurred when deleting product.', error);
        }
      );
    }
  }

  setDataDe(event) {
    const data = new JsonPipe().transform(event);
    this.datede = data;
    console.log('Select dataDe :' + data);
  }

  setDataAte(event) {
    const data = new JsonPipe().transform(event);
    this.dateate = data;
    console.log('Select dataAte :' + data);
  }

  pesquisar() {
    this.service.pesquisar(this.datede, this.dateate, this.logForm.value.ip)
    .subscribe(  (logs) => {
      console.log('Success! Delete Log Successful!');
      console.log(logs);
      this.logs = logs;
    },
    (error: AppError) => {
      this.error = error;
      console.log('Failed! Error occurred when deleting product.', error);
    }
  );
    console.log('pesquisano...');
  }

}



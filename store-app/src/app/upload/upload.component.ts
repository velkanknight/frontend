import { Component } from '@angular/core';

import { LogsService } from '../services/logs.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  file: File;

  constructor(private http: HttpClient, private service: LogsService) {}

  onFileSelected(event) {
    this.file = event.target.files[0];
    const file = new FormData();

    file.append('file', this.file, this.file.name);
    console.log('file:' + this.file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post('http://localhost:8081/logs/upload', file, {headers: headers}).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}



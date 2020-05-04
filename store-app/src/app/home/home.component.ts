import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LogsService } from '../services/logs.service';
import { GraphicsIp } from '../models/graphics-ip';
import { GraphicsUser } from '../models/graphics-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: File;
  data: any;
  dataRequest: any;
  datas: GraphicsIp[] = [];
  datasUser: GraphicsUser[] = [];
  labels: string[] = [];
  labelusers: string[] = [];
  requests: number[] = [];
  requestsUsers: string[] = [];

  constructor(private http: HttpClient, private service: LogsService) {

    service.getGraphicsIp()
    .subscribe( res => {
      this.datas = res;
      this.datas.forEach( data => {
        this.labels.push(data.ip);
        this.requests.push(data.requests);
      });
      this.data = {
        labels: this.labels,
        datasets: [
            {
                label: 'Ips/Requests',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: this.requests
            }
        ]
      };
    });
    service.getGraphicsusers()
    .subscribe( res => {
      this.datasUser = res;
      this.datasUser.forEach( data => {
        this.labelusers.push(data.userAgent);
        this.requestsUsers.push(data.requests);
      });
      this.dataRequest = {
        labels: this.labelusers,
        datasets: [
            {
                label: 'Ips',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: this.requestsUsers
            }
        ]
      };

    });


  //   this.data = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //         {
  //             label: 'My First dataset',
  //             backgroundColor: '#42A5F5',
  //             borderColor: '#1E88E5',
  //             data: [65, 59, 80, 81, 56, 55, 40]
  //         },
  //         {
  //             label: 'My Second dataset',
  //             backgroundColor: '#9CCC65',
  //             borderColor: '#7CB342',
  //             data: [28, 48, 40, 19, 86, 27, 90]
  //         }
  //     ]
  // }

  }

  ngOnInit() {
  }

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

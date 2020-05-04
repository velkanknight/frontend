import {Log} from '../models/log';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/app-error';
import { Injectable } from '@angular/core';
import { GraphicsIp } from '../models/graphics-ip';
import { GraphicsUser } from '../models/graphics-user';


@Injectable()
export class LogsService {

    private apiUrl = 'http://localhost:8081/logs';
    private logs: Log[] = [];

    constructor(private http: Http) {}

    getLogs(): Observable<any> {
      return this.http
        .get(this.apiUrl)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    getGraphicsIp(): Observable<GraphicsIp[]> {
      return this.http
        .get(this.apiUrl + '/ips')
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    getGraphicsusers(): Observable<GraphicsUser[]> {
      return this.http
        .get(this.apiUrl + '/users')
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    getLogsPromise(): Promise<Log[]> {
      return this.http
        .get(this.apiUrl)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .toPromise();
    }

    getLog(id: number) {
      return this.http
        .get(`${this.apiUrl}/${id}`)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    addLog(log: Log) {
      return this.http
        .post(this.apiUrl, log)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    updateLog(id: number, log: Log) {
      return this.http
        .put(`${this.apiUrl}/${id}`, log)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    deleteLog(id: number) {
      return this.http
        .delete(`${this.apiUrl}?id=${id}`)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    private handleError(error: Response) {
      return Observable.throw(new AppError(error));
    }

    pesquisar(datede: any, dateate: any, ip: any) {
      datede == undefined ? datede = null : datede;
       return this.http
      .get(this.apiUrl +'/search' + '?datade=' + datede + '&dateate' + dateate + '&ip=' + ip)
      .map((response: Response) => response.json())
      .catch(this.handleError);

    }

}
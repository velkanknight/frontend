import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoComplete } from 'primeng/autocomplete';
import { AppError } from '../common/app-error';
import { LogsService } from '../services/logs.service';
import { Log } from '../models/log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: number;
  log: Log;

  addNew: boolean;

  @ViewChild('f') logForm: NgForm;

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LogsService
  ) {
    this.log = new Log();
    this.addNew = true;
  }
  // filterCountrySingle(event) {
  //   console.log('fiilteContrySingle');
  //   const query = event.query;
  //   this.service
  //   .getProductsPromise()
  //      .then(countries => {
  //       this.filteredCountriesSingle = this.filterCountry(query, countries);
  //   });

  // }
  filterCountry(query, countries: any[]): any[] {
    console.log('filterConuter');

    const filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(country);
        }
    }
    return filtered;
}

  ngOnInit() {
    console.log('entrou nginit log-form');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('id paramentro' + id);
      if (id) {
        this.id = +id;
        this.service.getLog(this.id).subscribe(
          (log: Log) => {
            console.log('Success! Get Product Successful!');
            this.log = log;
            this.addNew = false;
          },
          (error: AppError) => {
            console.log('Failed! Error occurred when getting product.', error);
          }
        );
      }
    });
  }

  onSubmit() {
    this.log.data = this.logForm.value.data;
    this.log.ip = this.logForm.value.ip;
    this.log.request = this.logForm.value.request;
    this.log.status = this.logForm.value.status;
    this.log.userAgent = this.logForm.value.userAgent;

    if (this.addNew) {
      this.service.addLog(this.log).subscribe(
        (log: Log) => {
          console.log('Success! Add log successful.', log);
          this.router.navigate(['/logs']);
        },
        (error: AppError) => {
          console.log('Failed! Error occurred while adding a log.', error);
        }
      );
    } else {
      this.service.updateLog(this.id, this.log).subscribe(
        (log: Log) => {
          console.log('Success! Update log successful.', log);
          this.router.navigate(['/logs']);
        },
        (error: AppError) => {
          console.log(
            'Failed! Error occurred while updating a log.',
            error
          );
        }
      );
    }
  }
}

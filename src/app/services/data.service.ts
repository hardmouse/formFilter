import { Injectable } from '@angular/core';
import { Observable, of, throwError  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { WebApi } from '../modules/core/classes/webApi';
// import { WebServiceType } from '../modules/core/classes/webServiceType';
import {
  map,
  catchError,
  tap
} from 'rxjs/operators';
import { environment } from '../../environments/environment';

const mockurl = "../assets/mockdata/approval-list.json";

@Injectable()
export class DataService {
  
  constructor(
    private http: HttpClient,
  ) { }

  getData() {
    return this.http.get(mockurl);
  }
}


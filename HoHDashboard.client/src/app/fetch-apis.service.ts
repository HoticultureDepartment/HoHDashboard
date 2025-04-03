import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIsService {
  public readonly baseUrl = 'https://localhost:44305/api/';

  constructor(private http: HttpClient) { }

  Users() {
    let url = this.baseUrl + 'CommonType/users';
    return this.http.get(url);
  }

  Beneficiaries() {
    let url = this.baseUrl + 'CommonType/beneficiaries';
    return this.http.get(url);
  }

  FyYearSubsidyAmount() {
    let url = this.baseUrl + 'CommonType/fySubsidyAmount';
    return this.http.get(url);
  }
  Components() {
    let url = this.baseUrl + 'CommonType/components';
    return this.http.get(url);
  }
  AddComponent(data: any) {
    let url = this.baseUrl + 'CommonType/addComponent';
    return this.http.post(url, data);
  }
}

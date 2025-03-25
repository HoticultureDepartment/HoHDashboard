import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

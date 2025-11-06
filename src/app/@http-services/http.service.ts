import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  getApi(url: string): any {
    return this.httpClient.get(url);
  }

  postApi(url: string, postData: any) {
    return this.httpClient.post(url, postData);
  }
}

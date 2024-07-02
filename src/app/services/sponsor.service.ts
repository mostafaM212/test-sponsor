import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/iresponse';
import { Sponsor } from '../models/sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  backendUrl: string = 'https://dev.nobala.edu.sa/api'
  constructor(private http: HttpClient) { }

  getSponsor() {
    return this.http.get<IResponse<Sponsor>>(this.backendUrl + '/sponsors/')
  }
  addSponsor(data: any) {
    return this.http.post(this.backendUrl + '/sponsors/', data)
  }
}

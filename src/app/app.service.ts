import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "./globals";


@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private readonly http: HttpClient) { }


    send(form: FormData): Observable<any> {
        return this.http.post<any>(API_URL + 'api/v1/send', form);
           
    }

}
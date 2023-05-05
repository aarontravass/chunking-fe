import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "./globals";


@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private readonly http: HttpClient) { }


    send(data:any, header_start: number, header_end:number, header_total:number): Observable<any> {
        const headers= new HttpHeaders()
                            .set('header_start', header_start.toString())
                            .set('header_end', header_end.toString())
                            .set('header_total', header_total.toString())
        return this.http.post<any>(API_URL + 'api/v1/send', {headers});
           
    }

}
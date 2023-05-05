import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'chunking-fe';
    file = new Blob();
    private readonly chunk_size = 30;
    constructor(private readonly appService: AppService) {}
    onChange(event: any) {
        this.file = event.target.files[0];
        console.log(this.file)
    }
    async submit() {
        
        const buff = await this.file.arrayBuffer();
        console.log(buff)
        let header_start = 1, header_end = header_start + this.chunk_size - 1, header_total = buff.byteLength;
        while(header_end<header_total){
            const data = {
                data: buff.slice(header_start, header_end)
            }
            await this.appService
            .send(data, header_start, header_end, header_total)
            .toPromise()
            .then((res) => {
                console.log(res);
                header_start = header_end + 1;
                header_end = header_end + this.chunk_size;
            })
            .catch((er) => {
                console.error(er);
            });
            
        }
        
    }
}

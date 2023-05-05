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
    private readonly chunk_size = 10000;
    constructor(private readonly appService: AppService) {}
    async onChange(event: any) {
        this.file = event.target.files[0];
        console.log(this.file)
        console.log((await this.file.arrayBuffer()).byteLength)
    }
    async submit() {
        
        const buff = new Uint8Array(await this.file.arrayBuffer());
        console.log(buff)
        let header_start = 0, header_end = header_start + this.chunk_size, header_total = buff.byteLength;
        while(1){
            console.log(header_start, header_end)
            const data = {
                data: buff.slice(header_start, header_end)
            }
            await this.appService
            .send(data, header_start, header_end, header_total)
            .toPromise()
            .then((res) => {
                console.log(res);
               
            })
            .catch((er) => {
                console.error(er);
            });
            if(header_end==header_total) break;
            header_start = header_end;
            header_end = Math.min(header_start + this.chunk_size, header_total);
            
        }
        
    }
}

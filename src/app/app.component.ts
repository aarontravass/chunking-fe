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
    constructor(private readonly appService: AppService) {}
    onChange(event: any) {
        this.file = event.target.files[0];
    }
    async submit() {
        const form = new FormData();
        form.append('file', this.file);
        await this.appService
            .send(form)
            .toPromise()
            .then((res) => {
                console.log(res);
            })
            .catch((er) => {
                console.error(er);
            });
    }
}

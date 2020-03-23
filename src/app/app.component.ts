import { Component } from '@angular/core';
import { TokenCheckService, InitService, WhatsappService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cycWA';

  constructor( public _token:TokenCheckService ) { }
}

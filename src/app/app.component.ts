import { Component } from '@angular/core';
import { TokenCheckService, InitService, WhatsappService } from './services/service.index';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery: any;
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cycWA';

  constructor( public _token:TokenCheckService, public _route:Router, public _wa:WhatsappService ) {  }

  isList( t ){
    let exp = /app/gm
    return t.match(exp)
  }

  goBottom(){
    let dummyEl = document.getElementById('note');
    let isFocused = (document.activeElement === dummyEl);

    document.getElementById('link').click();
    if(isFocused){
      jQuery('#note').focus()
    }

    this._wa.newMsgs = 0
  }
}

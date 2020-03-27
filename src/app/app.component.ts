import { Component, OnInit } from '@angular/core';
import { TokenCheckService, WhatsappService } from './services/service.index';
import { Router } from '@angular/router';

declare var jQuery: any;
import * as moment from 'moment-timezone';
import * as Globals from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cycWA';

  constructor( public _token:TokenCheckService, public _route:Router, public _wa:WhatsappService) {
    this._wa.zdesk = Globals.ZDESK
  }

  ngOnInit(){
  }

  isList( t ){
    let exp = /app/gm
    return t.match(exp)
  }

  goBottom(){
    let dummyEl = document.getElementById('note');
    let isFocused = (document.activeElement === dummyEl);

    this._wa.scrollBottom()
    if(isFocused){
      jQuery('#note').focus()
    }

    this._wa.newMsgs = 0
  }

}

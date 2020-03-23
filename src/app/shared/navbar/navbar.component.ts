import { Component, OnInit } from '@angular/core';
import { TokenCheckService, InitService, WhatsappService } from '../../services/service.index';

declare var jQuery:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public _init:InitService, public _token:TokenCheckService ) { }

  ngOnInit() {
    window.setTimeout( () => {
      if( !this._token.token ){
        this.login()
      }
    },1000)
  }

  login(){
    jQuery('#loginModal').modal('show')
  }

  logout(){
    jQuery('#logOutModal').modal('show')
  }

}

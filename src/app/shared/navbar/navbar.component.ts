import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenCheckService, InitService, WhatsappService } from '../../services/service.index';
import { InfoClienteComponent } from '../../components/whatsapp/info-cliente/info-cliente.component';
import { AssignTicketComponent } from '../../components/whatsapp/assign-ticket/assign-ticket.component';

declare var jQuery:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(InfoClienteComponent, {static: false}) _info:InfoClienteComponent
  @ViewChild(AssignTicketComponent, {static: false}) _assign:AssignTicketComponent

  constructor( public _init:InitService, public _token:TokenCheckService, public _wa:WhatsappService, public _route:Router,
               private location: Location ) { }

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

  isChat( t ){
    let exp = /chat/gm
    return t.match(exp)
  }

  goBack() {
    this.location.back();
  }

  info(){
    this._info.openInfo()
  }

  assign(){
    this._assign.openAssign()
  }

}

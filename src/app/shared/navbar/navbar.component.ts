import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenCheckService, InitService } from '../../services/service.index';


declare var jQuery:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() tipo:any = ''
  @Output() _link = new EventEmitter<any>()

  constructor( public _init:InitService, public _token:TokenCheckService, public _route:Router,
               private location: Location) { }

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

  openModal( e ){
    console.log(e)
    this._link.emit(e)
  }


}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService, InitService, TokenCheckService } from '../../services/service.index';
declare var jQuery:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  login = {
    usn: '',
    usp: '',
    remember: ''
  }
  loginError = false;
  loginMsg = '';
  loginLoad = false

  constructor( public _login:LoginService, private _route:Router, private _token:TokenCheckService, private _init:InitService ) { }

  ngOnInit() {

  }

  validate( item ){
  }

  logIn( ){
    this.loginLoad = true

    // console.log(this.login)
    this._login.loginCyC( this.login, this._route.url )
    // console.log(this.login);
  }


}

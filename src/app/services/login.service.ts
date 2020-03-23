import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { InitService } from './init.service';
import { Router } from '@angular/router';
import { TokenCheckService } from 'src/app/services/token-check.service';

declare var jQuery:any;

@Injectable()
export class LoginService {

  loginError = false
  loginLoad = false
  loginMsg = ''

  constructor( private _api:ApiService, private _init:InitService, private _token:TokenCheckService, private _route:Router) { }

  loginCyC( logInfo, sourceUrl ){
    this.loginLoad = true
    let result
    console.log(logInfo)
    return this._api.restfulPut( logInfo, 'Login/login', false )
      .subscribe( res => {
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
                          token: res['token'],
                          tokenExpire: res['tokenExpire'],
                          username: res['username'],
                          hcInfo: res['hcInfo'],
                          credentials: res['credentials']
                        })
        );
        this._init.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.loginError=false;
        this.loginMsg='';
        jQuery('#loginModal').modal('hide');

        if( res['isAffiliate'] ){
          this._route.navigateByUrl('/afiliados')
        }else{
          this._route.navigateByUrl('/home')
          this._route.navigateByUrl(sourceUrl)
        }
        this._token.token=false
        this._init.getPreferences()
        this.loginLoad = false
        return { status: true, msg: 'Logueo Correcto', err: 'NA', isAffiliate: res['credentials']['viewOnlyAffiliates'] == '1' ? true : false}
      }, err => {
        this.loginLoad = false
        if(err){
          let error = err.error
          console.error(err.statusText, error.msg)
          this.loginError = true;
          this.loginMsg = error.msg;
          return { status: false, msg: error.msg, err: err.statusText }
        }
      })

  }



}

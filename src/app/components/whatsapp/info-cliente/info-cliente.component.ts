import { Component, OnInit } from '@angular/core';
import { InitService, ApiService, WhatsappService } from '../../../services/service.index';

import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.css']
})
export class InfoClienteComponent implements OnInit {

  loading:Object = {}
  rsvHistory = []
  userInfo = {}
  originalUserInfo = {}

  idiomas:Object = [
    {idioma: 'español', lang: 'idioma_es'},
    {idioma: 'inglés', lang: 'idioma_en'},
    {idioma: 'francés', lang: 'idioma_fr'},
    {idioma: 'portugués', lang: 'idioma_pt'}
  ]

constructor( public _wa:WhatsappService, private _init:InitService, private _api:ApiService, private toastr:ToastrService ) { }

ngOnInit() {
  }

openInfo(){
    this.rsvHistory = []
    this.userInfo = {}
    this.originalUserInfo = {}
    jQuery('#userInfo').modal('show')
    this.getUserInfo()
  }

tabSelected( e ){
    console.log(e.tab.textLabel)
    if( e.tab.textLabel == 'Reservas' ){
      this.getRsvHistory()
    }
  }

saveUserInfo(f){
    this.loading['savingUI'] = true;

    this._api.restfulPut( {values: this.userInfo, field: f}, 'Calls/updateUserV2' )
                .subscribe( res => {

                  this.loading['savingUI'] = false;
                  this.getUserInfo()

                }, err => {
                  this.loading['savingUI'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

getUserInfo( zdId = this._wa.chatInfo['rqId'] ){
    this.loading['userInfo'] = true;
    this.userInfo = {}
    this.originalUserInfo = {}

    this._api.restfulGet( zdId, 'Calls/showUser' )
                .subscribe( res => {

                  // console.log(res['data']['data'])

                  this.loading['userInfo'] = false;
                  this.userInfo['name'] = res['data']['data']['user']['name']
                  this.userInfo['email'] = res['data']['data']['user']['email']
                  this.userInfo['phone'] = res['data']['data']['user']['phone']
                  this.userInfo['rqId'] = zdId
                  this.userInfo['user_fields'] = res['data']['data']['user']['user_fields']

                  if( res['data']['data']['user']['user_fields'] && res['data']['data']['user']['user_fields'] ){
                    this.userInfo['whatsapp'] = res['data']['data']['user']['user_fields']['whatsapp'] ? res['data']['data']['user']['user_fields']['whatsapp'] : ''
                  }else{
                    this.userInfo['whatsapp'] = ''
                  }

                  this.originalUserInfo = JSON.parse(JSON.stringify(this.userInfo))
                  this.getRsvHistory()
                  console.log(res)


                }, err => {
                  this.loading['userInfo'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

getRsvHistory( zdClientId = this._wa.chatInfo['rqId'] ){

    this.loading['rsvHistory'] = true
    this.rsvHistory = []

    this._api.restfulGet( zdClientId, 'Rsv/getRsvHistory' )
                .subscribe( res => {

                  this.loading['rsvHistory'] = false;
                  this.rsvHistory = res['data']

                }, err => {
                  this.loading['rsvHistory'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

selectedLang(e){
    this.userInfo['user_fields']['idioma_cliente'] = e.value
    console.log(this.userInfo)
  }

}

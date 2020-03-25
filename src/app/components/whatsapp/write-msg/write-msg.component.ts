import { Component, OnInit } from '@angular/core';
import { InitService, ApiService, WhatsappService } from '../../../services/service.index';

import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-write-msg',
  templateUrl: './write-msg.component.html',
  styleUrls: ['./write-msg.component.css']
})
export class WriteMsgComponent implements OnInit {

  msgSend:any = ''
  loading:Object = {}
  showEmoji = false

  constructor( public _wa:WhatsappService, private _init:InitService, private _api:ApiService, private toastr:ToastrService ) { }

  ngOnInit() {
  }

  auto_grow(el) {
    let txt = el.value
    this.msgSend = txt
    let arr = txt.split('\n')
    let r = 0;
    for(let l of arr){
      r++
      let c = 0
      if( l != '' ){
        let line = l.split(' ')
        for( let col of line ){
          c++
          if( col.length + c > 60 ){
            r++
            c = col.length
          }else{
            c += col.length
          }
        }
      }

    }

    if( r > 5 ){
      r = 5
      jQuery('#note').css('overflow','auto')
    }else{
      jQuery('#note').css('overflow','hidden')
    }
    jQuery('#note').attr('rows',r)

    jQuery('#convWindow').innerHeight(window.innerHeight -  jQuery('#topMenu').innerHeight() - jQuery('#bottomBar').innerHeight())

  }

  submit( t = this._wa.chatInfo['ticketId'] ){

    this.loading['reading'] = true;

    let params = {
      ticket: t,
      msg: jQuery('#note').val(),
      author: this._init.currentUser['hcInfo']['zdId']
    }
    this._api.restfulPut( params, 'Whatsapp/sendMsg' )
                .subscribe( res => {

                  this.loading['reading'] = false;

                  this._wa.reloadChat = true
                  this._wa.getConv( t )
                  this.msgSend = ''
                  jQuery('#note').val('')
                  jQuery('#note').attr('rows',1)
                  jQuery('#convWindow').innerHeight(window.innerHeight -  jQuery('#topMenu').innerHeight() - jQuery('#bottomBar').innerHeight())

                }, err => {

                  this.loading['reading'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  addEmoji(e){
    this.msgSend = jQuery('#note').val() + e.emoji.colons
    jQuery('#note').val(this.msgSend)
    this.showEmoji = false
    console.log(e)
  }

}

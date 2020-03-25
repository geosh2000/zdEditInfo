import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WhatsappService } from '../../../services/service.index';

import * as moment from 'moment-timezone';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  windowHeight = 5

  constructor( private activatedRoute: ActivatedRoute, public _wa:WhatsappService, public _route:Router ) {
    this.activatedRoute.params.subscribe( params => {

      if ( params.tkt ){
        this._wa.reloadChat = true
        this._wa.getConv( params.tkt, true )
      }else{
        this._wa.reloadChat = true
      }

  });
  }

  ngOnInit() {
    this._wa.reloadChat = true
    this._wa.chatMsgs = []

    this.windowHeight = window.innerHeight -  jQuery('#topMenu').innerHeight() -  jQuery('#bottomBar').innerHeight()
  }

  ngOnDestroy(){
    this._wa.lastUrl = this._route.url
    this._wa.reloadChat = false
    this._wa.chatInfo = {}
    jQuery('.modal').modal('hide')
  }

  formatTime( t, f ){
    if( moment(t) < moment(moment().format('YYYY-MM-DD')) ){
      if( moment(t).format('YYYY-MM-DD') == moment().subtract(1,'days').format('YYYY-MM-DD') ){
        return 'ayer';
      }else{
        return moment(t).format('DD-MMM')
      }
    }

    return moment(t).format(f)
  }

  scrollBtm(){
    document.getElementById('link').click();
  }

  onScroll( e ){
    let clh = e.target.clientHeight
    let scr = e.target.scrollTop
    let dht = e.target.scrollHeight

    if( dht - scr - clh <= 0 ){
      this._wa.bottomFlag = true
      this._wa.newMsgs = 0
    }else{
      this._wa.bottomFlag = false
    }
  }

}

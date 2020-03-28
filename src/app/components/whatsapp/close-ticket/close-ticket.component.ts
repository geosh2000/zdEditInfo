import { Component, OnInit } from '@angular/core';
import { InitService, ApiService, WhatsappService } from '../../../services/service.index';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-close-ticket',
  templateUrl: './close-ticket.component.html',
  styleUrls: ['./close-ticket.component.css']
})
export class CloseTicketComponent implements OnInit {

  loading:Object = {}

  constructor(public _wa:WhatsappService, private _init:InitService, private _api:ApiService, private toastr:ToastrService,
              private _route:Router) { }

  ngOnInit() {
  }

  closeTkt(){
    if( !this._wa.chatInfo['ticketId'] ){
      this.toastr.error('Error al obtener el numero de ticket, intenta abrir la conversacion nuevamente', 'ERROR')
    }

    this.loading['closing'] = true;

    let tkt = this._wa.chatInfo['ticketId']

    this._api.restfulGet( tkt, 'Whatsapp/solve' )
        .subscribe( res => {

          this.loading['closing'] = false;

          if( this._wa.zdesk ){
            this._wa.reloadChat = false
            this._wa.chatInfo = {}
            this._wa.chatMsgs = {}
            this._wa.reloadTickets = true
            this._wa.getTickets( this._wa.selectedFilter )
            jQuery('#closeTicketModal').modal('hide')
          }else{
            this._route.navigate([this._wa.lastUrl]);
          }

        }, err => {
          this.loading['closing'] = false;

          const error = err.error;
          this.toastr.error( error.msg, err.status );
          console.error(err.statusText, error.msg);

        });

  }

}

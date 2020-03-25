import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InitService, ApiService, WhatsappService } from '../../../services/service.index';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignTicketComponent implements OnInit {

  loading:Object = {}
  users = []
  agent:any
  agentName:any

  constructor( public _wa:WhatsappService, private _init:InitService, private _api:ApiService, private toastr:ToastrService ) { }

  ngOnInit() {
  }

  openAssign(){
    this.agent = null
    this.agentName = null
    jQuery('#assignModal').modal('show')
    this.getZdUsers()
  }

  getZdUsers(){
    this.loading['users'] = true;

    this._api.restfulGet( '', 'Lists/zdUserList' )
        .subscribe( res => {

          this.loading['users'] = false;
          this.users = res['data']

        }, err => {
          this.loading['users'] = false;

          const error = err.error;
          this.toastr.error( error.msg, err.status );
          console.error(err.statusText, error.msg);

        });

  }

  selectedAg(e){
    this.agent = e.value['zdId']
    this.agentName = e.value['nCorto']
    console.log(e)
  }

  assignTkt( a = this.agent ){
    this.loading['assign'] = true;

    let params = {
      ticket: this._wa.chatInfo['ticketId'],
      assignee: a
    }

    this._api.restfulPut( params, 'Whatsapp/assignTicket' )
        .subscribe( res => {

          this.loading['assign'] = false;
          this.toastr.success( 'Cambio de asignación correcta', 'Completado' );
          this._wa.chatInfo['agentName'] = this.agentName
          jQuery('#assignModal').modal('hide')

        }, err => {
          this.loading['assign'] = false;

          const error = err.error;
          this.toastr.error( error.msg, err.status );
          console.error(err.statusText, error.msg);

        });
  }

}

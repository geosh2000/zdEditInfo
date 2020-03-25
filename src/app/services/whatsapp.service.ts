import { Injectable } from '@angular/core';
import { InitService } from './init.service';
import { ApiService } from './api.service';
import { OrderPipe } from 'ngx-order-pipe';
import { ToastrService } from 'ngx-toastr';

declare var jQuery: any;
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  // Navigation
  lastUrl = '/app'

  // listConversations
  title = 'Mis Conversaciones'
  loading = false
  tickets = []
  timeout:any
  reloadTickets = true

  // Chat Window
  chatMsgs = {}
  reloadChat = true
  chatInfo = {}
  newMsgs = 0
  bottomFlag = true

  constructor( private _init:InitService, private _api:ApiService, private orderPipe: OrderPipe, private toastr:ToastrService ) { }

  getTickets( s = this._init.currentUser['hcInfo']['zdId'], to = this.reloadTickets ){

    if( this.timeout ){
      clearTimeout(this.timeout)
    }

    switch( s ){
      case '0':
        this.title = 'Sin Asignar'
        break
      case '1':
        this.title = 'Todas las conversaciones'
        break
      default:
        this.title = 'Mis Conversaciones'
        break
    }

    if( !this.reloadTickets ){
      return true
    }

    this.loading = true;

    this._api.restfulGet( s, 'Whatsapp/listConv' )
                .subscribe( res => {
                  this.loading = false;
                  let tktsO = this.orderPipe.transform(res['data'], 'lastMsg')
                  let tkts = this.orderPipe.transform(tktsO, 'lastIsIn',true)
                  // let tkts = res['data']
                  let notif = false
                  let ticketsNot = []

                  for( let t of tkts){
                    if( t['assignee'] == s && t['lastIsIn'] == '1' && t['soundNotif'] == '0' && t['isRead'] == '0'  ){
                      notif = true
                      ticketsNot.push(t['ticketId'])
                    }

                    // if( t['ticketId'] == this.ticketSelected && t['lastIsIn'] == '1' && t['isRead'] == '0' ){
                    //   this.reloadTkt.emit(this.ticketSelected)
                    // }
                  }

                  if( notif ){
                    // this.okNotif(ticketsNot)
                  }

                  this.tickets = tkts

                  if( to ){
                    this.timeout = setTimeout( () => {
                      this.getTickets( s )
                    },10000)
                  }

                }, err => {
                  this.loading = false;

                  this.tickets = []

                  if( to ){
                    this.timeout = setTimeout( () => {
                      this.getTickets( s )
                    },10000)
                  }

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  getConv( loc, ft = false, to = this.reloadChat, rl = true  ){

    if( this.bottomFlag ){
      this.newMsgs = 0
    }

    clearTimeout(this.timeout)

    if( ft ){
      this.chatMsgs = {}
    }

    // dummy element
    let dummyEl = document.getElementById('note');

    // check for focus
    let isFocused = (document.activeElement === dummyEl);

    this.loading = true;
    let refresFlag = false

    this._api.restfulGet( loc, 'Whatsapp/getChat' )
                .subscribe( res => {

                  this.loading = false;
                  this.title = res['data'][0]['reqName']
                  this.chatInfo['requester'] = res['data'][0]['reqName']
                  this.chatInfo['phone'] = res['data'][0]['reqPhone']
                  this.chatInfo['rqId'] = res['data'][0]['zdId']
                  this.chatInfo['agentName'] = res['data'][0]['asignado']
                  this.chatInfo['ticketId'] = loc
                  // let url = 'https://material.angular.io/assets/img/examples/shiba1.jpg'
                  // jQuery('.client-image').css('background-image', 'url(' + url + ')');

                  let items = res['data']
                  let result:Object = {}
                  items = this.orderPipe.transform(items, 'date')

                  for( let i of items ){
                    i['dt'] = moment(i['date']).tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss')
                    let dt = moment(i['date']).tz('America/Bogota').format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? 'HOY' : moment(i['date']).tz('America/Bogota').format('YYYY-MM-DD')
                    if( result[dt] ){
                      result[dt].push(i)
                    }else{
                      result[dt] = [i]
                    }

                    i['attachments'] = JSON.parse(i['attachments'])
                  }

                  let msgs = 0

                  for( let dt in result ){
                    if( result.hasOwnProperty(dt) ){
                      if( this.chatMsgs[dt] ){
                        if( result[dt].length > this.chatMsgs[dt].length ){
                          for(let z = this.chatMsgs[dt].length; z < result[dt].length; z++ ){
                            this.chatMsgs[dt].push(result[dt][z])
                            msgs++
                          }
                        }
                      }else{
                        this.chatMsgs[dt] = result[dt]
                        msgs += result[dt].length
                      }
                    }
                  }

                  if( !this.bottomFlag ){
                    this.newMsgs = msgs
                  }


                  if(isFocused){
                    jQuery('#note').focus()
                  }

                  if( ft || this.bottomFlag ){
                     setTimeout( () => {
                      document.getElementById('link').click();
                      if(isFocused){
                        jQuery('#note').focus()
                      }
                    },500)
                  }

                  // if( to ){
                  //   setTimeout( () => {
                  //     this.scrollBtm()
                  //     if(isFocused){
                  //       jQuery('#note').focus()
                  //     }
                  //   },500)
                  // }

                  if( to ){
                    this.timeout = setTimeout( () => {
                      this.getConv( loc )
                    },10000)
                  }

                }, err => {
                  if( rl ){
                    this.timeout = setTimeout( () => {
                      this.getConv( loc )
                    },10000)
                  }

                  this.loading = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }
}

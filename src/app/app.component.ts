import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TokenCheckService } from './services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'cycWA';
  chatSize:any = 200
  resizeTo:any

  constructor( public _token:TokenCheckService, public _route:Router) {

  }

  ngOnInit(){}

  ngAfterViewInit(){}

}

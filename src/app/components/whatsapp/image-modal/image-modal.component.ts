import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  imgSrc:any = 'https://cyc-oasishoteles.com/img/noImage.png'
  maxHeight = 500

  constructor( ) {
  }

  ngOnInit() {
  }

  openImage( src ){
    console.log('abrir imagen')
    this.maxHeight = document.getElementById('chatWindowCyc').clientHeight
    this.imgSrc = src
    jQuery('#imageModal').modal('show')
  }

  closeModal(){
    jQuery('#imageModal').modal('hide')
    this.imgSrc = 'https://cyc-oasishoteles.com/img/noImage.png'
  }


}

import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'



@Injectable()
export class TokenCheckService {

  private subject = new Subject<any>()
  token = false
  lastLog = false
  expired = false

  sendTokenStatus( status:boolean ){
    this.subject.next({ status })
  }

  getTokenStatus(): Observable<any>{
    return this.subject.asObservable()
  }

  constructor(  ) {
    setInterval(()=>{ this.tokenCheck() }  ,1000)
  }

  tokenCheck(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    // Check token exists
    if( !currentUser ){
      this.token = false
      if( this.lastLog ){
        this.token = false
      }
      this.lastLog=false
    }else{
      // Check token expiration
      let now = new Date()
      let expire = new Date(`${currentUser.tokenExpire.replace(' ','T')}-05:00`)

      if( now <= expire ){
        // Token Valid
        this.token=true

        if( !this.lastLog ){

          this.token = true
          this.lastLog = true
          this.expired = false
        }
      }else{

        // Invalid Token
        this.token = false
        this.lastLog = false
        this.expired= true

        // Destroy token
        localStorage.removeItem('currentUser')
        this.token = false
      }


    }
  }

}


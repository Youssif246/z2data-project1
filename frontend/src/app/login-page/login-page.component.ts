import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  constructor(private checkLoginApi: ApisService, private router: Router){}
  
  email:string = ''
  password:string = ''

  doCheckLogin(){
    this.checkLoginApi.checkLogin(this.email, this.password).subscribe((data) => {
      if (data[0].status === "yes"){
        this.router.navigate(['dashboard/phones'])
      }else{
        alert('Email or password is not correct')
      }
    })
  }
}

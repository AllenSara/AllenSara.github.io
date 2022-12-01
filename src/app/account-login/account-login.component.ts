import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})

export class AccountLoginComponent implements OnInit {
  userEmail?: string;
  userPwd?: string;
  constructor(private router_srv: Router) { }

  ngOnInit(): void {
  }

  logIn(): void {
    if (UserManager.validateUser(this.userEmail?.trim(), this.userPwd?.trim())) 
    {
      UserManager.userSignedIn();
      this.router_srv.navigateByUrl('/BankAccount');
    }
    else {
      alert("You have entered an invalid username or password, or the combination is invalid.");
    }
  }
}
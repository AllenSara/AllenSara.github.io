import { Component, OnInit } from '@angular/core';
import { AccountOwner } from 'src/app/account-owner';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { Nihool } from '../nihool';

@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})

export class AccountOwnerComponent implements OnInit {
  editOwner: any;
  accountOwner: any;
  editAccountOwner: boolean = false;
  constructor(private router_srv:Router) { 
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    this.accountOwner = AccountOwner.getAccountOwner();
    this.editOwner = Object.assign({}, this.accountOwner);
  }

  saveAccountOwner():void{
    if (!this.editAccountOwner){
      if (this.editOwner.name.trim() ==""){
        showErrorFocus("Please enter a name", "name");
        this.editAccountOwner = true;
        return;
      }
      if (this.editOwner.address.trim() ==""){
        showErrorFocus("Please enter an address", "adrs");
        this.editAccountOwner = true;
        return;
      }
      Nihool.setStorage('accountOwner', this.editOwner);
      AccountOwner.setAccountOwner(Object.assign({}, this.editOwner));
      this.accountOwner = Object.assign({}, this.editOwner);
    }
  }

  cancel(): void {
    this.editOwner = Object.assign({}, this.accountOwner);
  }

}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}
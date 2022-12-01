import { Component, OnInit} from '@angular/core';
import { BankAccountDetails } from 'src/app/bank-account-details';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { Nihool } from '../nihool';

@Component({
  selector: 'app-bank-account-details',
  templateUrl: './bank-account-details.component.html',
  styleUrls: ['./bank-account-details.component.css']
})
export class BankAccountDetailsComponent implements OnInit {
  account:BankAccountDetails = new BankAccountDetails();
  editAccountDetails: boolean = false;
  public editBankDetails: any;
  public bankDetails: any;
  constructor(private router_srv:Router) { 
  }
  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }

    this.bankDetails = BankAccountDetails.getBankDetails();
    this.editBankDetails = Object.assign({}, this.bankDetails);
  }
  saveAccountDetails():void{
    if (!this.editAccountDetails){
      if (this.editBankDetails.branchName.trim() ==""){
        showErrorFocus("Please enter a branch name", "name");
        this.editAccountDetails = true;
        return;
      }
      if (this.editBankDetails.branchNumber == undefined){
        showErrorFocus("Please enter a branch number", "bnumber");
        this.editAccountDetails = true;
        return;
      }
      if (this.editBankDetails.accountNumber == undefined){
        showErrorFocus("Please enter an account number", "anumber");
        this.editAccountDetails = true;
        return;
      }
      Nihool.setStorage('bankDetails', this.editBankDetails);
      BankAccountDetails.setBankDetails(Object.assign({}, this.editBankDetails));
      this.bankDetails = Object.assign({}, this.editBankDetails);
    }
  }
  cancel(): void {
    this.editBankDetails = Object.assign({}, this.bankDetails);
  }
}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}
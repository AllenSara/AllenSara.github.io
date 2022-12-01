import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';
import { BankAccountDetails } from '../bank-account-details';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { Nihool } from '../nihool';
import { UserManager } from '../user-manager';


@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  currentAmount: number = 0;
  currentBalance: number = 0;
  transaction?: BankTransaction = undefined;
  public accountDetails: BankAccountDetails;
  currentTransactionType: TransactionType = -1;
  currentTransactionAsmachta: string = "";
  currentTransactionDates: string = "";
  currentTransactionNote: string = "";
  public accountOwner: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);
  lastActionFail: boolean = false

  constructor(private router_srv:Router) {
    this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
        this.router_srv.navigateByUrl('/AccountLogin');
    }
    Nihool.setStartState();
    let accountDetails = Nihool.getFromStorage('bankDetails');
    if(accountDetails){
      this.accountDetails = accountDetails;
    }
    BankAccountDetails.setBankDetails(this.accountDetails);
    let accountOwner = Nihool.getFromStorage('accountOwner');
    if(accountOwner){
      this.accountOwner = accountOwner;
    }
    AccountOwner.setAccountOwner(this.accountOwner);
    this.currentBalance=Nihool.getBalance();
  }

  doTransaction(): void {
    this.lastActionFail = false;
    if (this.currentAmount == null || this.currentAmount < 0) {
      showErrorFocus("amount must be positive", "amount");
      return;
    }
    if (this.currentAmount == 0 && this.currentTransactionType !=0){
      showErrorFocus("amount must be more than zero", "amount");
      return;
    }
    if (this.currentTransactionDates == "" ) {
      showErrorFocus("please insert a date", "taarich");
      return;
    }
    let today:Date=new Date();
    let typedDt:Date=new Date(this.currentTransactionDates);
    if (typedDt>today)
    {
      showErrorFocus("dates past the current date are invalid", "taarich");
      return;
    }
    if (this.getArraySize() > 0){
      if (this.getLastDate() > typedDt){ 
        showErrorFocus("date must be after the date of the last transaction", "taarich");
        return;
    }}
    if (this.getArraySize() == 0){
      if (this.currentTransactionType == 1){
          this.currentTransactionType = 0; 
          this.currentTransactionNote += "Transaction type was switched from deposit to open account.";
      }
      if (this.currentTransactionType == 2){
        showErrorFocus("Denied! The first transaction cannot be a withdrawal", "sugpeula"); 
        return;
      }
    }
    switch (this.currentTransactionType * 1) {
      case TransactionType.openAcount: this.currentBalance = this.currentAmount;
        break;
      case TransactionType.deposit: this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: if ((this.currentBalance - this.currentAmount) < this.accountDetails.limit) {
        this.lastActionFail = true;
        this.currentAmount = 0;
        this.currentTransactionAsmachta = "";
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: alert('please insert a transaction type');
        return;
    }
    if (this.currentTransactionAsmachta == null || this.currentTransactionAsmachta.trim() == ""){
      this.currentTransactionAsmachta = "#" + Nihool.counter.toString();
    }
    this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDates), this.currentTransactionAsmachta.trim(), this.currentTransactionType, this.currentBalance, Nihool.counter, this.currentTransactionNote);
    Nihool.addTransaction(this.transaction);
    this.resetFields();
  }

  getArraySize():number{return Nihool.getArraySize();}

  getTransactions():any{return Nihool.getTransactions();}

  getLastDate():any{return Nihool.getLastDate();}
  
  resetFields(): void{
    this.currentAmount = 0;
    this.currentTransactionAsmachta = "";
    this.currentTransactionDates = "";
    this.currentTransactionNote = "";
  }

  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }

  logOut():void
  {
    UserManager.byeUser();
    this.router_srv.navigateByUrl('/AccountLogin');
  }
  
}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}
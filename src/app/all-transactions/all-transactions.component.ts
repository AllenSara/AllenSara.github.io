import { Component, OnInit } from '@angular/core';
import { Nihool } from '../nihool';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { TransactionTypeNames } from '../bank-transaction';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {
  public transactionTypeNames = TransactionTypeNames;

  constructor(private router_srv:Router) { }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
  }

  getTransactions():any{
    return Nihool.getTransactions();
  }

  getArraySize():any{
    return Nihool.getArraySize();
  }
}

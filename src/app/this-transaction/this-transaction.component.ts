import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nihool } from '../nihool';
import { TransactionTypeNames, BankTransaction } from '../bank-transaction';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-this-transaction',
  templateUrl: './this-transaction.component.html',
  styleUrls: ['./this-transaction.component.css']
})
export class ThisTransactionComponent implements OnInit {
  public transactionTypeNames = TransactionTypeNames;
  currentTransaction: BankTransaction = Nihool.nihoolTransaction[0];
  constructor(private route: ActivatedRoute, private router_srv: Router) { }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }

    Nihool.setStartState();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentTransaction = Nihool.nihoolTransaction[id-1];
  }

  delete(){
    let id = Number(this.route.snapshot.paramMap.get('id'));
    id--;
    if (confirm("Would you like to delete this transaction?") == true) {
      if (Number(Nihool.nihoolTransaction[id].trnTyp) != 0){
          Nihool.deleteTransaction(id);
          this.router_srv.navigateByUrl('/AllTransactions');
      } else {
          alert("Sorry, we are unable to delete a transaction of the type Open Account");
      }
    }
  }

  goToTransactions(){
    this.router_srv.navigateByUrl('/AllTransactions');
  }
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { ThisTransactionComponent } from './this-transaction/this-transaction.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { BankAccountDetailsComponent } from './bank-account-details/bank-account-details.component';
import { MyDetailsComponent } from './my-details/my-details.component';


const routes: Routes = [
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component:ChangePasswordComponent},
  { path: 'AllTransactions', component:AllTransactionsComponent},
  { path: 'ThisTransaction/:id', component: ThisTransactionComponent},
  { path: 'AccountOwner', component: AccountOwnerComponent},
  { path: 'BankAccountDetails', component: BankAccountDetailsComponent},
  { path: 'MyDetails', component: MyDetailsComponent},
  { path: '', component: MyDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
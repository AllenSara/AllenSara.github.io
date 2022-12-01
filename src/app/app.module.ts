import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { BankAccountDetailsComponent } from './bank-account-details/bank-account-details.component';
import { MenuComponent } from './menu/menu.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { ThisTransactionComponent } from './this-transaction/this-transaction.component';
import { MyDetailsComponent } from './my-details/my-details.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountOwnerComponent,
    BankAccountDetailsComponent,
    BankAccountComponent,
    AccountLoginComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    MenuComponent,
    AllTransactionsComponent,
    ThisTransactionComponent,
    MyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { AccountOwner } from '../account-owner';
import { Nihool } from '../nihool';
import { UserManager } from '../user-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public accountOwner: any = '';
  constructor(private router_srv:Router) { }

  ngOnInit(): void {
    this.showMenu();
    let accountOwner = Nihool.getFromStorage('accountOwner');
    if(accountOwner){
      this.accountOwner = accountOwner;
    }
  }

  getBalance():any {
    return Nihool.getBalance();
  }

  getName():any {
    return AccountOwner.getAccountOwner()?.name;
  }

  logOut():void
  {
    UserManager.byeUser();
    this.router_srv.navigateByUrl('/AccountLogin');
  }

  showMenu(): boolean {
    let myUrl = window.location.pathname;
    let showUrl = true;
    this.PAGES_WITHOUT_MENU.forEach((pageName) => {
      if(myUrl.includes(pageName)){
        showUrl = false;
      } else if (myUrl == '/'){
        showUrl = false;}
    });
    return showUrl;
  }
  private PAGES_WITHOUT_MENU = ['/AccountLogin'];
}

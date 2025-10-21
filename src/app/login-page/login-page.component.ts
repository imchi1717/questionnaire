import { userData, userAccount } from './../@interface/ques-interface';
import { QuesDataService } from './../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignInComponent } from '../@dialog/dialog-sign-in/dialog-sign-in.component';
import { DialogRequiredComponent } from '../@dialog/dialog-required/dialog-required.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatTabsModule,
    CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  userData: userData = {
    name: '',
    phone: '',
    email: '',
    age: null,
  };
  userAccount: userAccount = {
    account: '',
    password: '',
  };
  hidePassword = true;
  selectedTab = 0; // 0 = 登入, 1 = 註冊
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private quesDataService: QuesDataService,) { }

  // 密碼眼睛
  eyeBtn() {
    this.hidePassword = !this.hidePassword;
  }

  // "註冊"
  textBtn() {
    this.selectedTab = 1;
  }

  // 登入按鈕
  loginbtn() {
    //有沒有填所有資料
    if (!this.userAccount.account || !this.userAccount.password) {
      this.dialog.open(DialogRequiredComponent);
      return;
    }
    this.router.navigateByUrl('/list');

    // 確認管理者或使用者
    if (this.userAccount.account == 'imchi' && this.userAccount.password == '5417') {
      this.quesDataService.show();
    } else {
      this.quesDataService.hide();
    }
    this.quesDataService._admin$.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('listEdit');
      } else {
        this.router.navigateByUrl('list');
      }
    })
  }

  // 註冊按鈕
  signInbtn() {
    // 有沒有填所有資料
    // 單選或文字題：檢查 answer 是否為空
    if (!this.userData.name || !this.userData.phone || !this.userData.email || !this.userData.age) {
      this.dialog.open(DialogRequiredComponent);
      return;
    }
    this.dialog.open(DialogSignInComponent);
  }



}

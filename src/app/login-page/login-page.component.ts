import { userData } from './../@interface/ques-interface';
import { QuesDataService } from './../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignInComponent } from '../@dialog/dialog-sign-in/dialog-sign-in.component';
import { userAccount } from '../@interface/ques-interface';
import { DialogRequiredComponent } from '../@dialog/dialog-required/dialog-required.component';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatTabsModule,
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

  userAccount!: userAccount;

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private quesDataService: QuesDataService) { }


  // 登入按鈕
  loginbtn() {
    this.router.navigateByUrl('/list');
    // 要寫if確認會員
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

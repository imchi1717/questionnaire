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
import { HttpService } from '../@http-services/http.service';
import { DialogFailComponent } from '../@dialog/dialog-fail/dialog-fail.component';
import { DialogErrorComponent } from '../@dialog/dialog-error/dialog-error.component';

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
    private quesDataService: QuesDataService,
    private httpService: HttpService) { }

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

    // 後端驗證帳號密碼
    this.httpService.postApi('http://localhost:8080/quiz/accountLogin', this.userAccount)
      .subscribe((res: any) => {
        console.log('後端回傳:', res);
        if (res.code == 200) {
          this.quesDataService.userData = {
            name: res.name,
            phone: res.phone,
            email: res.email,
            age: res.age
          }
          if (res.admin == true) {
            // 管理者
            this.quesDataService.show();
            this.router.navigateByUrl('listEdit');
          } else {
            // 使用者
            this.quesDataService.hide();
            this.router.navigateByUrl('list');
          }

        } else if (res.code == 400 || res.code == 404) {
          // 登入失敗，跳出 Dialog
          this.dialog.open(DialogFailComponent);
        }
      });
}

// 註冊按鈕
signInbtn() {
  // 有沒有填所有資料
  // 單選或文字題：檢查 answer 是否為空
  if (!this.userData.name || !this.userData.phone || !this.userData.email ||
    !this.userData.age || !this.userAccount.account || !this.userAccount.password) {
    this.dialog.open(DialogErrorComponent);
    return;
  }

  // 串接後端
  let signData = {
    account: this.userAccount.account,
    password: this.userAccount.password,
    name: this.userData.name,
    phone: this.userData.phone,
    email: this.userData.email,
    age: this.userData.age,
    admin: false,
  }

  this.httpService.postApi('http://localhost:8080/quiz/register', signData).subscribe((res: any) => {
    console.log(res);
    console.log(signData);

    if (res.code == 200) {
      this.dialog.open(DialogSignInComponent);
      // 清空欄位
      this.userAccount.account = '';
      this.userAccount.password = '';
      this.userData.name = '';
      this.userData.phone = '';
      this.userData.email = '';
      this.userData.age = null;
      // 回到tab: 登入
      this.selectedTab = 0
    } else {
      this.dialog.open(DialogErrorComponent);
    }
  });
}
}

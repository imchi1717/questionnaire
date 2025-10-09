import { QuesDataService } from './../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignInComponent } from '../@dialog/dialog-sign-in/dialog-sign-in.component';

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

  userData = {
    name: '',
    phone: '',
    email: '',
    age: ''
  };

  userAccount = {
    account: '',
    password: ''
  }
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private quesDataService: QuesDataService){}


  // 登入按鈕
  loginbtn() {
    this.router.navigateByUrl('/list');
    // 要寫if確認會員
  }

  // 註冊按鈕
  signInbtn() {
    this.dialog.open(DialogSignInComponent);
  }
}

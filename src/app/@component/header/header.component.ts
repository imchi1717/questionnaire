import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../../@dialog/dialog-user/dialog-user.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor( private router: Router){}

  isLogin: boolean = true;

  ngOnInit(): void {
    // this.router.events.subscribe是router套件去偵測url變化
    // 當路由有變化時就會觸發
    this.router.events.subscribe((res) => {
      // 抓路由回傳的生命週期中的路由切換結束(NavigationEnd)
      if (res instanceof NavigationEnd) {
        this.isLogin = (res.url == '/list' || res.url == '/listEdit' );
      }
    });
  }

  // logo
  logoBtn() {
    this.router.navigateByUrl('loginPage');
  }

  // 個人資料dialog
  readonly dialog = inject(MatDialog);
  openUser() {
    const dialogRef = this.dialog.open(DialogUserComponent,{
      width: '330px',
      height: '340px',
    })
  }

  // 管理員登入
  adminLog() {
    this.router.navigateByUrl('/loginPage');
  }

  // 登出
  logOut() {
    this.router.navigateByUrl('/loginPage');
  }


}

import { ThemeDataService } from './../@services/theme-data.service';
import { QuesDataService } from './../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSendComponent } from '../@dialog/dialog-send/dialog-send.component';

@Component({
  selector: 'app-check',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss'
})
export class CheckComponent {

  userData!: any;
  theme!: any;
  quesArray: any[] = [];
  quesAns!: any;
  readonly dialog = inject(MatDialog);


  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
    private themeDataService: ThemeDataService,) {}


  ngOnInit(): void {
    // 從service抓theme資訊於此頁面
    this.theme = this.themeDataService.theme;
    // 從service抓user資訊於此頁面
    this.userData = this.quesDataService.userData;
    // 從service抓question資訊於此頁面
    this.quesArray = this.quesDataService.quesArray;
    this.quesAns = this.quesDataService.quesArray;
  }


  // 按鈕
  revise() {
    this.router.navigateByUrl('/innerPage');
  }

  // 打開dialog
  openDialog() {
    this.dialog.open(DialogSendComponent,);
  }
}

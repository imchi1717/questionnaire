import { QuesDataService } from './../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSendComponent } from '../@dialog/dialog-send/dialog-send.component';
import { theme, userData, multiQues, singleQues, textQues, ques } from '../@interface/ques-interface';


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

  userData!: userData;
  theme!: theme;
  quesArray: ques[] = [];
  singleQues: singleQues[] = [];
  multiQuesArray: multiQues[] = [];
  textQues: textQues[] = [];
  answer!: ques[];
  readonly dialog = inject(MatDialog);


  constructor(
    private router: Router,
    private quesDataService: QuesDataService,) { }


  ngOnInit(): void {
    // 從service抓資訊於此頁面
    this.theme = this.quesDataService.theme;
    this.userData = this.quesDataService.userData;
    this.quesArray = this.quesDataService.quesArray;
    this.singleQues = this.quesArray.filter(item => item.type == 'S') as singleQues[];
    this.multiQuesArray = this.quesArray.filter(item => item.type == 'M') as multiQues[];
    this.textQues = this.quesArray.filter(item => item.type == 'T') as textQues[];
  }

  // 按鈕
  revise() {
    this.router.navigateByUrl('/innerPage');
  }

  // 打開dialog
  openDialog() {
    // 逐題清空答案
    for (let quesData of this.quesDataService.quesArray) {
      // 單選題
      if (quesData.type == "S" || quesData.type == "T") {
        quesData.answer = "";
      }
      // 多選題
      if (quesData.type == "M") {
        for (let optionData of quesData.options) {
          optionData.checkBoolean = false;
        }
      }
    }
    this.dialog.open(DialogSendComponent);
  }
}

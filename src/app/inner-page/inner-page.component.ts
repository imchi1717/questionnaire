import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuesDataService } from '../@services/ques-data.service';
import { FormsModule } from '@angular/forms';
import { theme, userData, multiQues, singleQues, textQues, ques } from '../@interface/ques-interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequiredComponent } from '../@dialog/dialog-required/dialog-required.component';


@Component({
  selector: 'app-inner-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './inner-page.component.html',
  styleUrl: './inner-page.component.scss'
})
export class InnerPageComponent {

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
    // 從service資訊抓到頁面
    this.theme = this.quesDataService.theme;
    this.userData = this.quesDataService.userData;
    this.quesArray = this.quesDataService.quesArray;
    this.singleQues = this.quesArray.filter(item => item.type == 'S') as singleQues[];
    this.multiQuesArray = this.quesArray.filter(item => item.type == 'M') as multiQues[];
    this.textQues = this.quesArray.filter(item => item.type == 'T') as textQues[];
  }

  // 取消按鈕
  cancel() {
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
    this.router.navigateByUrl('/list');
  }

  // 預覽
  check() {
    // service塞給answer
    this.answer = this.quesDataService.getQues();

    // 有沒有填答案
    for (let quesData of this.quesDataService.quesArray) {
      // 單選或文字題：檢查 answer 是否為空
      if ((quesData.type == "S" || quesData.type == "T") && !quesData.answer) {
        this.dialog.open(DialogRequiredComponent);
        return;
      }
      if (quesData.type == "M" && !quesData.options.some(opt => opt.checkBoolean) ) {
        this.dialog.open(DialogRequiredComponent);
        return;
      }
    }
    this.router.navigateByUrl('/check');
  }
}






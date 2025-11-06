import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuesDataService } from '../@services/ques-data.service';
import { FormsModule } from '@angular/forms';
import { quiz, userData, multiQues, singleQues, textQues, create, questionVoList, theme } from '../@interface/ques-interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequiredComponent } from '../@dialog/dialog-required/dialog-required.component';
import { HttpService } from '../@http-services/http.service';


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

  theme!: theme;
  userData!: userData;
  create!: create;
  quiz!: quiz;
  quizList: quiz[] = [];
  questionVoList: questionVoList[] = [];
  singleQues: singleQues[] = [];
  multiQuesArray: multiQues[] = [];
  textQues: textQues[] = [];
  answer!: questionVoList[];
  isAdmin!: boolean;
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
  ) { }


  ngOnInit(): void {
    // 從 service 資訊抓取初始資料
    this.create = this.quesDataService.create;
    this.quiz = this.quesDataService.create.quiz;
    this.questionVoList = this.quesDataService.create.questionVoList;
    this.theme = this.quesDataService.theme;
    this.userData = this.quesDataService.userData;

    // 過濾各類型題目
    this.singleQues = this.questionVoList.filter(item => item.type == 'S') as singleQues[];
    this.multiQuesArray = this.questionVoList.filter(item => item.type == 'M') as multiQues[];
    this.textQues = this.questionVoList.filter(item => item.type == 'T') as textQues[]

    this.quesDataService._admin$.subscribe((res) => {
      this.isAdmin = res;
    })
  }



  // 取消按鈕
  cancel() {
    // 逐題清空答案
    for (let quesData of this.quesDataService.create.questionVoList) {
      // 單選題
      if (quesData.type == "S" || quesData.type == "T") {
        quesData.radioAnswer;
      }
      // 多選題
      if (quesData.type == "M") {
        for (let optionData of quesData.optionsList) {
          optionData.checkBoolean = false;
        }
      }
    }
    // 訂閱判斷 admin 狀態
    this.quesDataService._admin$.subscribe(isAdmin => {
      if (isAdmin) {
        this.router.navigateByUrl('/listEdit');
      } else {
        this.router.navigateByUrl('/list');
      }
    }).unsubscribe(); // 用完立即取消訂閱，避免記憶體洩漏
  }


  // 預覽
  check() {
    // service塞給answer
    this.answer = this.quesDataService.create.questionVoList;

    // 有沒有填答案
    for (let quesData of this.quesDataService.create.questionVoList) {
      // 單選或文字題：檢查 answer 是否為空
      if ((quesData.type == "S" || quesData.type == "T") && !quesData.radioAnswer && !quesData.textAnswer) {
        this.dialog.open(DialogRequiredComponent);
        return;
      }
      if (quesData.type == "M" && !quesData.optionsList.some(opt => opt.checkBoolean)) {
        this.dialog.open(DialogRequiredComponent);
        return;
      }
    }
    this.router.navigateByUrl('/check');
  }

  // 回到上一頁
  backPage() {
    this.router.navigateByUrl('/listEdit');
  }
}






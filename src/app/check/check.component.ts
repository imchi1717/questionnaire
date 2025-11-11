import { QuesDataService } from './../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSendComponent } from '../@dialog/dialog-send/dialog-send.component';
import { quiz, userData, multiQues, singleQues, textQues, questionVoList, theme, create } from '../@interface/ques-interface';
import { HttpService } from '../@http-services/http.service';


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

  theme!: theme;
  create!: create;
  userData!: userData;
  quiz!: quiz;
  questionVoList: questionVoList[] = [];
  singleQues: singleQues[] = [];
  multiQuesArray: multiQues[] = [];
  textQues: textQues[] = [];
  answer!: questionVoList[];
  readonly dialog = inject(MatDialog);


  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
    private httpService: HttpService) { }


  ngOnInit(): void {
    // 從service抓資訊於此頁面
    this.theme = this.quesDataService.theme;
    this.create = this.quesDataService.create;
    this.quiz = this.quesDataService.create.quiz;
    this.userData = this.quesDataService.userData;
    this.questionVoList = this.quesDataService.create.questionVoList;
    this.singleQues = this.questionVoList.filter(item => item.type == 'S') as singleQues[];
    this.multiQuesArray = this.questionVoList.filter(item => item.type == 'M') as multiQues[];
    this.textQues = this.questionVoList.filter(item => item.type == 'T') as textQues[];
  }

  // 按鈕
  revise() {
    this.router.navigateByUrl('/innerPage');
  }

  // 打開dialog
  openDialog() {
    let finalAnswerArray: any[] = [];  // 後端 ArrayList<Answer> 的結構
    for (let quesData of this.quesDataService.create.questionVoList) {
      let currentAnswer: any = {
        questionId: quesData.questionId,
        textAnswer: quesData.textAnswer || "", // 確保有預設值
        radioAnswer: quesData.radioAnswer || 0, // 確保有預設值
        optionsList: [] // 預設為空列表
      };

      if (quesData.type == 'S') {
        // 單選題
        // 這裡可以刪減不必要的欄位，只保留後端需要的 (questionId, radioAnswer, textAnswer)
      } else if (quesData.type === 'T') {
        // 文字題：主要用 textAnswer
      } else if (quesData.type === 'M') {
        // 多選題：需要構造 optionsList
        let selectedOptions = quesData.optionsList
          .filter(option => option.checkBoolean == true) // 篩選被勾選的選項
          .map(option => ({ // 構造符合 Options 類別的物件
            code: option.code,
            optionName: option.optionName,
            checkBoolean: true // 雖然後端有這個，但通常填寫答案時，傳送勾選的列表即可
          }));

        currentAnswer.optionsList = selectedOptions;
      }
      finalAnswerArray.push(currentAnswer);
    }

    let fillin = {
      user: this.quesDataService.userData,
      quizId: this.quesDataService.create.quiz.id,
      // **** 關鍵修正：這裡傳遞的是一個陣列 (Array) ****
      answerList: finalAnswerArray
    };

    this.httpService.postApi('http://localhost:8080/quiz/fillin', fillin).subscribe((res: any) => {
      console.log(res);
      this.quesDataService.create = res;
    });

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
    this.dialog.open(DialogSendComponent);
  }
}

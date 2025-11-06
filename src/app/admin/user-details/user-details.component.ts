import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuesDataService } from '../../@services/ques-data.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { userData, quiz, questionVoList, singleQues, multiQues, textQues, theme } from '../../@interface/ques-interface';


@Component({
  selector: 'app-user-details',
  imports: [FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userData!: userData;
  quiz!: quiz;
  questionVoList: questionVoList[] = [];
  singleQues: singleQues[] = [];
  multiQuesArray: multiQues[] = [];
  textQues: textQues[] = [];
  answer!: questionVoList[];
  theme!: theme;
  readonly dialog = inject(MatDialog);


  constructor(
    private router: Router,
    private quesDataService: QuesDataService,) { }


  ngOnInit(): void {
    // 從service抓資訊於此頁面
    this.theme = this.quesDataService.theme;
    this.quiz = this.quesDataService.create.quiz;
    this.userData = this.quesDataService.userData;
    this.questionVoList = this.quesDataService.create.questionVoList;
    this.singleQues = this.questionVoList.filter(item => item.type == 'S') as singleQues[];
    this.multiQuesArray = this.questionVoList.filter(item => item.type == 'M') as multiQues[];
    this.textQues = this.questionVoList.filter(item => item.type == 'T') as textQues[];
  }

  // 按鈕
  back() {
    this.router.navigateByUrl('/feedback');
  }

}

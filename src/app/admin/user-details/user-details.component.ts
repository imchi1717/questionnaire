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
  selectedUserFeedback: any;
  readonly dialog = inject(MatDialog);


  constructor(
    private router: Router,
    private quesDataService: QuesDataService,) { }


  ngOnInit(): void {
    this.theme = this.quesDataService.theme;
    this.selectedUserFeedback = this.quesDataService.selectedFeedback;

    if (this.selectedUserFeedback) {
      this.quiz = this.selectedUserFeedback.quiz;
      this.userData = this.selectedUserFeedback.user;

      const questionVoList: questionVoList[] = this.selectedUserFeedback.questionVoList;
      this.questionVoList = questionVoList;

      this.singleQues = this.questionVoList.filter(item => item.type == 'S') as singleQues[];
      this.multiQuesArray = this.questionVoList.filter(item => item.type == 'M') as multiQues[];
      this.textQues = this.questionVoList.filter(item => item.type == 'T') as textQues[];
    } else {
      this.router.navigateByUrl('/feedback');
    }
  }

  // 按鈕
  back() {
    this.router.navigateByUrl('/feedback');
  }

}

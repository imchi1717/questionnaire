import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuesDataService } from '../../@services/ques-data.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { userData, theme, ques, singleQues, multiQues, textQues } from '../../@interface/ques-interface';


@Component({
  selector: 'app-user-details',
  imports: [FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
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
  back() {
    this.router.navigateByUrl('/feedback');
  }

}

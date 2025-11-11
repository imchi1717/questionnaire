import { create } from './../../@interface/ques-interface';
import { HttpService } from './../../@http-services/http.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuesDataService } from '../../@services/ques-data.service';
import { FormsModule } from '@angular/forms';
import { quiz, questionVoList, theme } from '../../@interface/ques-interface';

@Component({
  selector: 'app-ckeck-edit',
  imports: [FormsModule],
  templateUrl: './ckeck-edit.component.html',
  styleUrl: './ckeck-edit.component.scss'
})
export class CkeckEditComponent {

  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
    private httpService: HttpService) { }

  theme!: theme;
  create!: create;
  quiz!: quiz;
  questionVoList: questionVoList[] = [];


  ngOnInit(): void {
    // 從service抓資訊於此頁面
    this.theme = this.quesDataService.theme;
    this.create = this.quesDataService.create;
    this.questionVoList = this.quesDataService.create.questionVoList;
    this.quiz = this.quesDataService.create.quiz;
  }

  // 按鈕
  back() {
    this.router.navigateByUrl('/quesNameEdit');
  }

  save() {
    this.create.quiz.publish = false;
    // 判斷是新增還是更新
    if (this.quesDataService.create.quiz.id) {
      this.httpService.postApi('http://localhost:8080/quiz/update', this.create)
        .subscribe((res: any) => {
          this.create = this.quesDataService.create;
        });
    } else {
      this.httpService.postApi('http://localhost:8080/quiz/create', this.create)
        .subscribe((res: any) => {
          this.create = this.quesDataService.create;
        });
    }
    this.router.navigateByUrl('/listEdit');

  }

  publish() {
    this.create.quiz.publish = true;
    if (this.quesDataService.create.quiz.id) {
      // 已存在問卷 → 更新
      this.httpService.postApi('http://localhost:8080/quiz/update', this.create)
        .subscribe((res: any) => {
          this.create = this.quesDataService.create;
        });

    } else {
      this.httpService.postApi('http://localhost:8080/quiz/create', this.create)
        .subscribe((res: any) => {
          this.create = this.quesDataService.create;
        });
    }
    this.router.navigateByUrl('/listEdit');
  }
}

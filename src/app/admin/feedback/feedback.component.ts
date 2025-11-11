import { quiz, userData, questionVoList } from './../../@interface/ques-interface';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpService } from '../../@http-services/http.service';
import { QuesDataService } from '../../@services/ques-data.service';

@Component({
  selector: 'app-feedback',
  imports: [
    MatTableModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatPaginatorModule,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
    private httpService: HttpService) { }

  feedback!: string[];
  quiz!: quiz;
  userData!: userData;
  questionVoList: questionVoList[] = [];
  feedbackList: any[] = []; // 用來儲存所有回饋的完整列表

  displayedColumns: string[] = ['id', 'name', 'fillDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    let quizId = this.quesDataService.create.quiz.id;
    let url = `http://localhost:8080/quiz/feeback?quizId=${quizId}`;
    this.httpService.getApi(url).subscribe((res: any) => {
      this.feedbackList = res.feedbackVoList;
      this.userData = this.quesDataService.userData;
      this.quiz = this.quesDataService.create.quiz;
      let transformedData: PeriodicElement[] = this.feedbackList // 使用儲存的列表
        .map((item: any, index: number) => {
          return {
            id: index + 1,
            name: item.user.name,
            fillDate: item.fillinDate,
            result: '前往'
          }
        });
      this.dataSource.data = transformedData;
    });
  }

  goToFeedback(element: any) {
    // 1. 找到該使用者完整的 FeedbackVo 物件
    // 由於表格的 id 是 index + 1，所以我們用 id - 1
    let selectedFeedback = this.feedbackList[element.id - 1];
    console.log(selectedFeedback);

    // 2. 將單一使用者的完整資料存入 Service
    this.quesDataService.selectedFeedback = selectedFeedback;

    // 3. 導航到詳情頁
    this.router.navigateByUrl('/userDetails');
  }

  back() {
    this.router.navigateByUrl('/listEdit');
  }
}


export interface PeriodicElement {
  name: string;
  id: number;
  fillDate: string;
  result: string;
}


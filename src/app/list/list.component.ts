import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpService } from '../@http-services/http.service';
import { QuesDataService } from '../@services/ques-data.service';
import { create } from '../@interface/ques-interface';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {

  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
    private httpService: HttpService,
  ) { }

  selectData: string = "";
  inputData!: string;
  sDate!: string;
  eDate!: string;
  create!: create;

  displayedColumns: string[] = ['id', 'title', 'state', 'startDate', 'endDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  private initialData: PeriodicElement[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.httpService.getApi('http://localhost:8080/quiz/published_list')
      .subscribe((res: any) => {
        this.dataSource.data = res.quizList;
        this.initialData = res.quizList;
        this.updateState();
      });
  }

  // 依時間判斷狀態
  updateState() {
    let today = new Date();
    for (let data of this.dataSource.data) {
      let start = new Date(data.startDate);
      let end = new Date(data.endDate);
      if (today < start) {
        data.state = "即將開始";
        data.result = "-";
      } else if (today >= start && today <= end) {
        data.state = "進行中";
        data.result = "-";
      } else {
        data.state = "結束";
        data.result = "統計圖";
      }
    }
  }

    // 篩選
    searchBtn() {
      // 從原始資料開始篩選
      let filteredData: PeriodicElement[] = [...this.initialData];

      // 1. 標題篩選 (如果 inputData 有值)
      if (this.inputData) {
        filteredData = filteredData.filter(item =>
          item.title.toLowerCase().includes(this.inputData.toLowerCase())
        );
      }

      // 2. 開始時間篩選 (如果 sDate 有值)
      if (this.sDate) {
        filteredData = filteredData.filter(item =>
          item.startDate >= this.sDate
        );
      }

      // 3. 結束時間篩選 (如果 eDate 有值)
      if (this.eDate) {
        filteredData = filteredData.filter(item =>
          item.endDate <= this.eDate // 假設你想要小於等於結束日期
        );
      }

      // 4. 將篩選結果更新到 dataSource
      this.dataSource.data = filteredData;

      // 5. 重新計算狀態（雖然 updateState 已經在 ngOnInit 中跑過，但篩選後資料變動也建議重新跑一次）
      this.updateState();

      // 6. 清除選中的項目
      this.selection.clear();

      // 7. 確保分頁器在資料量改變後重新計算頁數
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
    }

    clearBtn() {
      // 1. 清除篩選的輸入值
      this.inputData = "";
      this.sDate = "";
      this.eDate = "";
      this.selectData = ""; // 如果你有用 selectData (雖然在 HTML 中被註解掉了)

      // 2. 將資料恢復為原始資料
      this.dataSource.data = [...this.initialData];

      // 3. 重新計算狀態
      this.updateState();

      // 4. 清除選中的項目
      this.selection.clear();

      // 5. 確保分頁器跳回第一頁
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
    }

  goToFeedback(element: any) {
    if (element.state == '進行中') {
      let quizId = element.id;
      let url = `http://localhost:8080/quiz/question_list?quizId=${quizId}`;
      this.httpService.getApi(url).subscribe((res: any) => {
        if (res.code == 200) {
          this.quesDataService.create = {
            quiz: {
              id: element.id,
              title: element.title,
              startDate: element.startDate,
              endDate: element.endDate,
              description: element.description,
              publish: false
            },
            questionVoList: res.questionVoList
          };
          this.router.navigateByUrl('/innerPage');
        }
      });
    } else if (element.state == '結束') {
      let quizId = element.id;
      let url = `http://localhost:8080/quiz/statistic?quizId=${quizId}`;
      this.httpService.getApi(url).subscribe((res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.quesDataService.setStatisticData(res.statisticVo.questionCountVoList);
          this.quesDataService.create = {
            quiz: {
              id: element.id,
              title: element.title,
              startDate: element.startDate,
              endDate: element.endDate,
              description: element.description || '',
              publish: element.publish || false
            },
            questionVoList: []
          };
          this.router.navigateByUrl('/chart');
        } else {
          console.error('統計資料回傳錯誤或格式不符。');
        }
      });
    }
  }


  // 狀態篩選
//   changeState() {
//     for (let data of this.dataSource.data) {
//       if (this.selectData == "進行中") {
//         this.dataSource.data = this.dataSource.data.filter(item => item.state == "進行中");
//       } else if (this.selectData == "即將開始") {
//         this.dataSource.data = this.dataSource.data.filter(item => item.state == "即將開始");
//       } else {
//         this.dataSource.data = this.dataSource.data.filter(item => item.state == "結束");
//       }
//     }
//   }
}

export interface PeriodicElement {
  title: string;
  id: number;
  state: string;
  startDate: string;
  endDate: string;
  result: string;
}

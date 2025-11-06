import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpService } from '../@http-services/http.service';
import { QuesDataService } from '../@services/ques-data.service';
import { create } from '../@interface/ques-interface';


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.httpService.getApi('http://localhost:8080/quiz/list')
      .subscribe((res: any) => {
        console.log(res);
        this.dataSource.data = res.quizList;
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
      this.router.navigateByUrl('/chart');
    }
  }

  // 即時搜尋
  searchInput() {
    // 開一個空陣列儲存篩選的資料
    let tidyData: PeriodicElement[] = [];
    for (let data of this.dataSource.data) {
      if (data.title.indexOf(this.inputData) != -1) {  // 有符合
        tidyData.push(data);
      }
    }
    // 篩選完的資料等於表格目前的資料
    this.dataSource.data = tidyData;
  }


  // 時間篩選
  changeSDate() {
    let tidyData: PeriodicElement[] = [];
    // 沒選日期顯示全部
    if (!this.selectData) {
      this.dataSource.data = this.dataSource.data;
      return;
    }
    let selectedTime = new Date(this.selectData).getTime();
    // 日期比較篩選
    for (let data of this.dataSource.data) {
      let startTime = new Date(data.startDate).getTime();
      if (startTime <= selectedTime) {
        tidyData.push(data);
      }
    }
    // 更新表格資料
    this.dataSource.data = tidyData;
  }

  changeEDate() {
    let tidyData: PeriodicElement[] = [];
    // 沒選日期顯示全部
    if (!this.selectData) {
      this.dataSource.data = this.dataSource.data;
      return;
    }
    let selectedTime = new Date(this.selectData).getTime();
    // 日期比較篩選
    for (let data of this.dataSource.data) {
      let endTime = new Date(data.endDate).getTime();
      if (endTime >= selectedTime) {
        tidyData.push(data);
      }
    }
    // 更新表格資料
    this.dataSource.data = tidyData;
  }


  // 狀態篩選
  changeState() {
    for (let data of this.dataSource.data) {
      if (this.selectData == "進行中") {
        this.dataSource.data = this.dataSource.data.filter(item => item.state == "進行中");
      } else if (this.selectData == "即將開始") {
        this.dataSource.data = this.dataSource.data.filter(item => item.state == "即將開始");
      } else {
        this.dataSource.data = this.dataSource.data.filter(item => item.state == "結束");
      }
    }
  }
}

export interface PeriodicElement {
  title: string;
  position: number;
  state: string;
  startDate: string;
  endDate: string;
  result: string;
}

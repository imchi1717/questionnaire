import { create, quiz } from './../../@interface/ques-interface';
import { QuesDataService } from './../../@services/ques-data.service';
import { HttpService } from './../../@http-services/http.service';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogDeleteComponent } from '../../@dialog/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-list-edit',
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatCheckboxModule
  ],
  templateUrl: './list-edit.component.html',
  styleUrl: './list-edit.component.scss'
})



export class ListEditComponent {

  constructor(
    private router: Router,
    private httpService: HttpService,
    private quesDataService: QuesDataService
  ) { }

  selectData: string = "";
  inputData!: string;
  sDate!: string;
  eDate!: string;
  create!: create;
  quiz!: quiz;
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['select', 'id', 'title', 'state', 'startDate', 'endDate', 'result', 'response'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // 後端資料
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
        data.result = "修改";
        data.response = "-";
      } else if (today >= start && today <= end) {
        data.state = "進行中";
        data.result = "-";
        data.response = "-";
      } else {
        data.state = "結束";
        data.result = "統計圖";
        data.response = "看回饋";
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
    } else if (element.state == '即將開始') {
          let quizId = element.id;
    let url = `http://localhost:8080/quiz/question_list?quizId=${quizId}`;
    this.httpService.getApi(url).subscribe((res: any) => {
      if (res.code === 200) {
        // 將資料帶回 QuesNameEditComponent
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
        this.quesDataService.editBoolean = true; // 設定為編輯模式
        this.router.navigateByUrl('/quesNameEdit'); // 跳轉到問卷編輯頁
      }
    });
    } else {
      this.router.navigateByUrl('/chart');
    }
  }

  goToPage(element: any) {
    if (element.state === '結束') {
      this.router.navigateByUrl('/feedback');
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

  // 勾選欄
  // 判斷「是否全部選中」
  isAllSelected() {
    const numSelected = this.selection.selected.length;  // 目前被選中資料的數量
    const numRows = this.dataSource.data.length;  // 資料總數量
    return numSelected === numRows;
  }

  // 根據 isAllSelected() 結果決定「全選或全取消」
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // 時間篩選
  changeSDate() {
    this.dataSource.data = this.dataSource.data.filter(item => item.startDate >= this.sDate);
  }

  changeEDate() {
    this.dataSource.data = this.dataSource.data.filter(item => item.endDate >= this.eDate);
  }


  // 刪除icon
  delBtn() {
    // 取得勾選的資料
    let select = this.selection.selected;
    // 若沒有勾選到的 return 停止執行這個函式，直接結束
    if (select.length == 0) {
      return;
    }

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { count: select.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        let delSelect = { quizIdList: this.selection.selected.map(item => item.id) }
        this.httpService.postApi('http://localhost:8080/quiz/delete', delSelect)
          .subscribe((res: any) => {
            // 後端刪除成功 → 從 dataSource 移除
            this.dataSource.data = this.dataSource.data.filter(item => !select.includes(item));
            this.selection.clear();
          });
      }
    });


  }

  // 新增icon
  addBtn() {
    this.router.navigateByUrl('quesNameEdit');
  }
}

export interface PeriodicElement {
  title: string;
  id: number;
  state: string;
  startDate: string;
  endDate: string;
  result: string;
  response: string;
}




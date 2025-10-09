import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import  {MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

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

  constructor(private router: Router){}
  selectData: string = "";
  inputData!: string;
  sDate!: string;
  eDate!: string;
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['select', 'position', 'name', 'state', 'sDate', 'eDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  // 即時搜尋
  searchInput() {
    // 開一個空陣列儲存篩選的資料
    let tidyData: PeriodicElement[] = [];
    for (let data of ELEMENT_DATA) {
      if (data.name.indexOf(this.inputData)!= -1){  // 有符合
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
    this.dataSource.data = ELEMENT_DATA.filter(item => item.sDate >= this.sDate);
  }

  changeEDate() {
    this.dataSource.data = ELEMENT_DATA.filter(item => item.eDate >= this.eDate);
  }

  // icon
    // delete
  delBtn() {
    // 取得勾選的資料
    let select = this.selection.selected;
    // 若沒有勾選到的 return停止執行這個函式，直接結束
    if (select.length == 0) {
      return;
    }
    // 保留表格中沒有勾選的項目
    this.dataSource.data = this.dataSource.data.filter(item => !select.includes(item));
    this.selection.clear;
  }
    // add
  addBtn() {
     this.router.navigateByUrl('quesNameEdit');
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  state: string;
  sDate: string;
  eDate: string;
  result: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '吃飯喜好', state: '進行中', sDate: '2025-10-09', eDate: '2025-12-09', result: '→'},
  {position: 2, name: 'Helium', state: '即將開始', sDate: '2025-11-09', eDate: '2025-11-29', result: '→'},
  {position: 3, name: 'Lithium', state: '進行中', sDate: '2025-08-09', eDate: '2025-08-12', result: '→'},
  {position: 4, name: 'Beryllium', state: '結束', sDate: '2025-10-09', eDate: '2025-12-09', result: '→'},
  {position: 5, name: 'Boron', state: '結束', sDate: '2025-09-09', eDate: '2026-03-09', result: '→'},
  {position: 6, name: 'Carbon', state: '即將開始', sDate: '2025-12-28', eDate: '2026-05-09', result: '→'},
  {position: 7, name: 'Nitrogen', state: '進行中', sDate: '2025-05-09', eDate: '2025-06-09', result: '→'},
  {position: 8, name: 'Oxygen', state: '即將開始', sDate: '2025-10-19', eDate: '2025-11-09', result: '→'},
  {position: 9, name: 'Fluorine', state: '即將開始', sDate: '2025-05-09', eDate: '2025-12-09', result: '→'},
];



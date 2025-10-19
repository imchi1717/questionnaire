import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


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

  constructor(private router: Router){}

  selectData: string = "";
  inputData!: string;
  sDate!: string;
  eDate!: string;

  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['position', 'name', 'state', 'sDate', 'eDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

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

  // 時間篩選
  changeSDate() {
    this.dataSource.data = ELEMENT_DATA.filter(item => item.sDate >= this.sDate);
  }

  changeEDate() {
    this.dataSource.data = ELEMENT_DATA.filter(item => item.eDate >= this.eDate);
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
  {position: 10, name: 'Carbon', state: '即將開始', sDate: '2025-12-28', eDate: '2026-05-09', result: '→'},
  {position: 11, name: 'Nitrogen', state: '進行中', sDate: '2025-05-09', eDate: '2025-06-09', result: '→'},
  {position: 12, name: 'Oxygen', state: '即將開始', sDate: '2025-10-19', eDate: '2025-11-09', result: '→'},
];

import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  displayedColumns: string[] = ['position', 'name', 'state', 'sDate', 'eDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
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
  {position: 1, name: 'Hydrogen', state: '進行中', sDate: '2025-05-09', eDate: '2025-05-09', result: 'H'},
  {position: 2, name: 'Helium', state: '進行中', sDate: '2025-05-09', eDate: '2025-05-09', result: 'He'},
  {position: 3, name: 'Lithium', state: '進行中', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Li'},
  {position: 4, name: 'Beryllium', state: '結束', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Be'},
  {position: 5, name: 'Boron', state: '結束', sDate: '2025-05-09', eDate: '2025-05-09', result: 'B'},
  {position: 6, name: 'Carbon', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'C'},
  {position: 7, name: 'Nitrogen', state: '進行中', sDate: '2025-05-09', eDate: '2025-05-09', result: 'N'},
  {position: 8, name: 'Oxygen', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'O'},
  {position: 9, name: 'Fluorine', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'F'},
  {position: 10, name: 'Neon', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Ne'},
  {position: 11, name: 'Sodium', state: '進行中', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Na'},
  {position: 12, name: 'Magnesium', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Mg'},
  {position: 13, name: 'Aluminum', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Al'},
  {position: 14, name: 'Silicon', state: '結束', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Si'},
  {position: 15, name: 'Phosphorus', state: '進行中', sDate: '2025-05-09', eDate: '2025-05-09', result: 'P'},
  {position: 16, name: 'Sulfur', state: '結束', sDate: '2025-05-09', eDate: '2025-05-09', result: 'S'},
  {position: 17, name: 'Chlorine', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Cl'},
  {position: 18, name: 'Argon', state: '即將開始', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Ar'},
  {position: 19, name: 'Potassium', state: '結束', sDate: '2025-05-09', eDate: '2025-05-09', result: 'K'},
  {position: 20, name: 'Calcium', state: '結束', sDate: '2025-05-09', eDate: '2025-05-09', result: 'Ca'},
];

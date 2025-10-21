import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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

  constructor(private router: Router) { }

  displayedColumns: string[] = ['position', 'name', 'fillDate','result'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  back() {
    this.router.navigateByUrl('/listEdit');
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  fillDate: string;
  result: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: '王一八', fillDate: '2025-10-09 00:09 ', result: '前往' },
  { position: 2, name: '林二九', fillDate: '2025-10-09 11:18', result: '前往' },
  { position: 3, name: '李三四', fillDate: '2025-10-12 19:15', result: '前往' },
  { position: 4, name: '伍四三', fillDate: '2025-10-13 09:33', result: '前往' },
  { position: 5, name: '王大陸', fillDate: '2025-10-14 10:56', result: '前往' },
];


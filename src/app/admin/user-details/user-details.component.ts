import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuesDataService } from '../../@services/ques-data.service';
import { ThemeDataService } from '../../@services/theme-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  imports: [FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userData!: any;
  theme!: any;
  quesArray: any[] = [];
  quesAns!: any;


  constructor(
    private router: Router,
    private quesDataService: QuesDataService,
    private themeDataService: ThemeDataService,) {}


  ngOnInit(): void {
    // 從service抓theme資訊於此頁面
    this.theme = this.themeDataService.theme;
    // 從service抓user資訊於此頁面
    this.userData = this.quesDataService.userData;
    // 從service抓user題目於此頁面
    this.quesArray = this.quesDataService.quesArray;
  }

  // 按鈕
  save() {
    this.router.navigateByUrl('/checkEdit');
  }

  publish() {
    this.quesAns = this.quesDataService.quesArray;
    this.router.navigateByUrl('/listEdit');
  }
}

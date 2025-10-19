import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuesDataService } from '../../@services/ques-data.service';
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
    private quesDataService: QuesDataService,) {}


  ngOnInit(): void {
    // 從service抓theme資訊於此頁面
    this.theme = this.quesDataService.theme;

    // 從service抓user資訊於此頁面
    this.userData = this.quesDataService.userData;

    // 從service抓user題目於此頁面
    this.quesArray = this.quesDataService.quesArray;
  }

  // 取消按鈕
  cancel() {
    // 逐題清空答案
    for (let serviceData of this.quesDataService.quesArray) {
      // 單選題
      if (serviceData.type == "S" || serviceData.type == "T") {
        serviceData.answer = "";
      }
      // 多選題
      if (serviceData.type == "M") {
        for (let serviceData2 of serviceData.options) {
          // 若型態不等於 string
          if(typeof serviceData2 !== "string") {
            serviceData2.checkBoolean = false;
          }
        }
      }
    }
    // 回到 list 頁面
    this.router.navigateByUrl('/list');
  }

  check() {
    this.quesAns = this.quesDataService.quesArray;
    console.log(this.quesAns);
    this.router.navigateByUrl('/check');
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuesDataService } from '../../@services/ques-data.service';
import { FormsModule } from '@angular/forms';
import { theme, ques} from '../../@interface/ques-interface';

@Component({
  selector: 'app-ckeck-edit',
  imports: [ FormsModule],
  templateUrl: './ckeck-edit.component.html',
  styleUrl: './ckeck-edit.component.scss'
})
export class CkeckEditComponent {

  theme!: theme;
  quesArray: ques[] = [];



  constructor(
    private router: Router,
    private quesDataService: QuesDataService,) {}


  ngOnInit(): void {
    // 從service抓資訊於此頁面
    this.quesArray = this.quesDataService.getQues();
    this.theme = this.quesDataService.theme;
  }

  // 按鈕
  back() {
    this.router.navigateByUrl('/quesNameEdit');
  }
  save() {
    this.router.navigateByUrl('/checkEdit');
  }

  publish() {
    let newQues = this.quesDataService.quesArray;
    this.router.navigateByUrl('/listEdit');
  }
}



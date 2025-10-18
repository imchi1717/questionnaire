import { QuesDataService } from './../../@services/ques-data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ques-name-edit',
  imports: [
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './ques-name-edit.component.html',
  styleUrl: './ques-name-edit.component.scss'
})
export class QuesNameEditComponent {

  constructor(
    private quesDataService: QuesDataService,
    private router: Router
  ) { }

  quesEdit!: string;
  quesName!: string;
  quesDescription!: string;
  sDate!: string;
  eDate!: string;
  isLinear = false;
  optionInput: string[] = ['', ''];
  extraOptions: string[] = [];
  quesTitle!: string;
  required = false;
  quesArray: any[] = [];
  newQues: any[] =[];


  // 題目類型
  choose(res: string) {
    this.quesEdit = res;
  }

  // 返回按鈕
  backPage() {
    this.router.navigateByUrl('/listEdit')
  }
  // 預覽按鈕
  checkPage() {
    this.router.navigateByUrl('/checkEdit');
    this.quesDataService.getQues();
  }

  // 新增選項icon
  addBtn() {
    this.extraOptions.push('');  // 新增空字串
  }

  // 刪除選項icon
  removeBtn(index: number) {
    this.extraOptions.splice(index, 1); // (起始,長度)刪除指定長度的資料
  }

  // 新增題目按鈕
  addQuesBtn() {
    // 預防空白標題
    if (!this.quesTitle.trim()) {
      return;
    }
    // 判斷題目類型
    if (this.quesEdit == 'S') {
      this.newQues.push(
        this.quesTitle,
        this.quesEdit,
        this.optionInput
    )
    // } else if (this.quesEdit == 'M') {
    //   this.newQues = {
    //     quesTitle: this.quesTitle,
    //     type: this.quesEdit,
    //     options: [],
    //   }
    // } else {
    //   this.newQues = {
    //     quesTitle: this.quesTitle,
    //     type: this.quesEdit,
    //     options: [],
      };
      // 即時顯示
      this.quesArray.push(this.newQues);
      console.log(this.newQues);

      // 傳新增題目給 service
      this.quesDataService.addQues(this.newQues);

      // 清除輸入
      this.quesTitle = '';
      this.optionInput = ['', ''];
      this.extraOptions = [];
      this.required = false;


  }
}

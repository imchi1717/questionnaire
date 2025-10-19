import { basicQues, multiQues, ques, singleQues, textQues, theme } from './../../@interface/ques-interface';
import { QuesDataService } from './../../@services/ques-data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ques-name-edit',
  imports: [
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './ques-name-edit.component.html',
  styleUrl: './ques-name-edit.component.scss'
})
export class QuesNameEditComponent {

  constructor(
    private quesDataService: QuesDataService,
    private router: Router
  ) { }

  theme: theme = {
    id: '',
    mainTitle: '',
    subtitle: '',
    sDate: '',
    eDate: '',
    theme: '',
    describe: '',
  }
  isLinear = false;
  optionInput: string[] = ['', '']; // 固定選項
  extraOptions: string[] = []; // 額外選項
  quesArray: ques[] = [];
  quesType!: string;
  quesTitle = '';
  required = true;
  today!: string;
  newQues!: ques;

  ngOnInit() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    this.today = `${year}-${month}-${day}`;
  }



  // 題目類型
  choose(res: string) {
    this.quesType = res;
  }

  // 新增選項icon
  addBtn() {
    this.extraOptions.push('');
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

    // 單選題
    if (this.quesType == 'S') {
      this.newQues = {
        quesId: (this.quesDataService.quesArray.length + 1).toString(),
        required: this.required,
        quesTitle: this.quesTitle,
        type: "S",
        options: [...this.optionInput, ...this.extraOptions],
        answer: '',
      }
      // 複選題
    } else if (this.quesType == 'M') {
      this.newQues = {
        quesId: (this.quesDataService.quesArray.length + 1).toString(),
        required: this.required,
        quesTitle: this.quesTitle,
        type: "M",
        options: [
          ...this.extraOptions.map(opt => ({ name: opt, checkBoolean: false })),
          { name: this.optionInput[0], checkBoolean: false },
          { name: this.optionInput[1], checkBoolean: false }
        ],
      }
      // 文字題
    } else if (this.quesType == 'T') {
      this.newQues = {
        quesId: (this.quesDataService.quesArray.length + 1).toString(),
        required: this.required,
        quesTitle: this.quesTitle,
        type: "T",
        options: [],
        answer: '',
      };
    } else {
      return;
    }
    // 傳新增題目給 service
    this.quesDataService.quesArray.push(this.newQues);

    // 即時顯示
    this.quesArray.push(this.newQues);

    // 清除輸入
    this.quesTitle = '';
    this.optionInput = ['', ''];
    this.extraOptions = [];
    this.required = false;
  }


  // 返回按鈕
  backPage() {
    this.router.navigateByUrl('/listEdit')
  }

  // 預覽按鈕
  checkPage() {
    this.quesDataService.quesArray = this.quesArray;
    this.quesDataService.theme = this.theme;
    this.router.navigateByUrl('/checkEdit');
  }
}

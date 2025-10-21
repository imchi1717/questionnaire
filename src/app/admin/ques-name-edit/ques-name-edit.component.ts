import { ques, theme } from './../../@interface/ques-interface';
import { QuesDataService } from './../../@services/ques-data.service';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequiredComponent } from '../../@dialog/dialog-required/dialog-required.component';



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
  };
  isLinear = false;
  optionInput: string[] = ['', '']; // 固定選項
  extraOptions: string[] = []; // 額外選項
  quesArray: ques[] = [];
  quesType!: string;
  quesTitle = '';
  required = true;
  today!: string;
  newQues!: ques;
  editingIndex!: number | null;  // 正在編輯的題目索引
  currentStep = 0 // stepper預設第一步
  readonly dialog = inject(MatDialog);


  ngOnInit() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    this.today = `${year}-${month}-${day}`;

    if (this.quesDataService.editBoolean) {
      // 返回編輯頁，保留資料
      this.quesArray = this.quesDataService.quesArray;
      this.theme = this.quesDataService.theme;
    } else {
      // 從其他頁面進入，初始化空資料
      this.quesArray = [];
      this.theme = {
        id: '',
        mainTitle: '',
        subtitle: '',
        sDate: '',
        eDate: '',
        theme: '',
        describe: '',
      };
      // 同時重置 service 內資料
      this.quesDataService.quesArray = [];
      this.quesDataService.theme = this.theme;
      this.quesDataService.editBoolean = true; // 開始編輯
    }
  }



  // 題目類型
  choose(res: string) {
    this.quesType = res;
  }

  // 新增選項icon
  addBtn() {
    this.extraOptions.push('');
  }

  // 移除選項icon
  removeBtn(index: number) {
    this.extraOptions.splice(index, 1); // (起始,長度)刪除指定長度的資料
  }

  // 刪除題目icon
  deleteBtn(index: number) {
    this.quesArray.splice(index, 1);
    this.quesDataService.quesArray.splice(index, 1);
  }

  // 編輯題目icon
  editBtn(index: number) {
    // 取得使用者要編輯的題目 index是題目陣列位置
    let ques = this.quesArray[index];
    // 將要編輯的欄位帶回表單
    this.quesTitle = ques.quesTitle;
    this.quesType = ques.type;
    this.required = ques.required;

    // 題目選項的欄位帶回表單
    if (ques.type == "S") {
      // array.slice(startIndex, endIndex)
      this.optionInput = ques.options.slice(0, 2); // 固定選項
      this.extraOptions = ques.options.slice(2); // 額外選項
    } else if (ques.type == "M") {
      // 陣列倒數第1、2個元素 [選項[索引]].name
      this.optionInput = [ques.options[ques.options.length - 2].name, ques.options[ques.options.length - 1].name];
      this.extraOptions = ques.options.slice(0, ques.options.length - 2).map(opt => opt.name);
    } else {
      this.optionInput = ['', ''];
      this.extraOptions = [];
    }
    // 正在編輯第 index 筆題目
    this.editingIndex = index;
    // 跳到stepper第二步
    this.currentStep = 1;
  };


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
        options: [...this.optionInput, ...this.extraOptions].filter(opt => opt.trim()),
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
          ...this.extraOptions.filter(opt => opt.trim()).map(opt => ({ name: opt, checkBoolean: false })),
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

    // 判斷是否是新題目還是舊題目
    if (this.editingIndex !== null) {
      // 更新題目(編輯模式)
      this.quesArray[this.editingIndex] = this.newQues;
      this.quesDataService.quesArray[this.editingIndex] = this.newQues;
      this.editingIndex = null;
    } else {
      // 新增題目
      this.quesArray.push(this.newQues);
      this.quesDataService.quesArray.push(this.newQues);
    }

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
    // 是否必填項目都有填寫
    if (!this.theme.mainTitle || !this.theme.subtitle || !this.theme.sDate || !this.theme.eDate) {
      this.dialog.open(DialogRequiredComponent);
      return;
    }
    if (this.quesArray.length == 0) {
      this.dialog.open(DialogRequiredComponent,);
      return;
    }
    this.quesDataService.quesArray = this.quesArray;
    this.quesDataService.theme = this.theme;
    this.router.navigateByUrl('/checkEdit');
  }
}

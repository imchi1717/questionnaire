import { multiOptions, questionVoList, quiz, singleOptions } from './../../@interface/ques-interface';
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
    private router: Router,
  ) { }

  quiz: quiz = {
    id: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    publish: false,
  };

  isLinear = false;
  optionInput: string[] = ['', '']; // 固定選項
  extraOptions: string[] = []; // 額外選項
  questionVoList: questionVoList[] = [];
  quesType!: string;
  name = '';
  required = true;
  today!: string;
  newQues!: questionVoList;
  editingIndex: number | null = null;  // 正在編輯的題目索引
  currentStep = 0 // stepper預設第一步
  readonly dialog = inject(MatDialog);


  ngOnInit() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    this.today = `${year}-${month}-${day}`;

    // 訂閱 Service 的題目列表
    this.quesDataService._questionList$.subscribe((res) => {
      this.questionVoList = res; // 每次更新都會刷新 questionVoList
    })

    if (this.quesDataService.editBoolean) {
      // 返回編輯頁，保留資料
      this.questionVoList = [...this.quesDataService.create.questionVoList];
      this.quiz = { ...this.quesDataService.create.quiz };
    } else {
      // 從其他頁面進入，初始化空資料
      this.questionVoList = [];
      this.quiz = {
        id: 0,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        publish: false,
      };
      // 同時重置 service 內資料
      this.quesDataService.updateQuestionList([]);
      this.quesDataService.create.quiz = this.quiz
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
    let updated = [...this.quesDataService.create.questionVoList];
    updated.splice(index, 1);
    this.quesDataService.updateQuestionList(updated);
  }

  // 編輯題目icon
  editBtn(index: number) {
    // 取得使用者要編輯的題目 index是題目陣列位置
    let ques = this.questionVoList[index];
    // 將要編輯的欄位帶回表單
    this.name = ques.name;
    this.quesType = ques.type;
    this.required = ques.required;

    // 題目選項的欄位帶回表單
    if (ques.type == "S") {
      // array.slice(startIndex, endIndex)
      let opts = ques.optionsList.map(opt => opt.optionName);
      this.optionInput = opts.slice(0, 2); // 固定選項
      this.extraOptions = opts.slice(2).filter(opt => opt.trim()); // 額外選項
    } else if (ques.type == "M") {
      // 陣列倒數第1、2個元素 [選項[索引]].name
      let opts = ques.optionsList.map(opt => opt.optionName);
      this.optionInput = opts.slice(-2);
      this.extraOptions = opts.slice(0, -2).filter(n => n.trim());
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
    if (!this.name.trim()) {
      return;
    }

    // 問題編號
    let nextQuestionId = this.quesDataService.create.questionVoList.length + 1;
    // 選項
    let allOptions = [...this.optionInput, ...this.extraOptions]
      .map(opt => opt.trim()).filter(opt => opt);

    // 單選題
    if (this.quesType == 'S') {
      let optionsList: singleOptions[] = allOptions.map((opt, idx) => ({
        code: idx + 1,
        optionName: opt
      }));
      this.newQues = {
        questionId: nextQuestionId,
        name: this.name,
        optionsList: optionsList,
        type: "S",
        required: this.required,
        radioAnswer: 0,
        textAnswer: '',
      }
      // 複選題
    } else if (this.quesType == 'M') {
      let optionsList: multiOptions[] = allOptions.map((opt, idx) => ({
        code: idx + 1,
        optionName: opt,
        checkBoolean: false
      }));
      this.newQues = {
        questionId: nextQuestionId,
        name: this.name,
        type: "M",
        required: this.required,
        optionsList: optionsList,
        radioAnswer: 0,
        textAnswer: '',
      }
      // 文字題
    } else if (this.quesType == 'T') {
      this.newQues = {
        questionId: nextQuestionId,
        required: this.required,
        name: this.name,
        type: "T",
        optionsList: [],
        radioAnswer: 0,
        textAnswer: '',
      };
    } else {
      return;
    }

    // 判斷新增或編輯
    if (this.editingIndex !== null) {
      this.quesDataService.updateQuestion(this.editingIndex, this.newQues);
      this.editingIndex = null;
    } else {
      this.quesDataService.addQuestion(this.newQues);
    }

    // 清除輸入
    this.name = '';
    this.optionInput = ['', ''];
    this.extraOptions = [];
    this.required = true;
    this.currentStep = 1;
  }


  // 返回按鈕
  backPage() {
    this.router.navigateByUrl('/listEdit')
  }

  // 預覽按鈕
  checkPage() {
    // 是否必填項目都有填寫
    if (!this.quiz.title || !this.quiz.description || !this.quiz.startDate || !this.quiz.endDate) {
      this.dialog.open(DialogRequiredComponent);
      return;
    }
    if (this.questionVoList.length == 0) {
      this.dialog.open(DialogRequiredComponent,);
      return;
    }
    this.quesDataService.create.questionVoList = this.questionVoList;
    this.quesDataService.create.quiz = this.quiz;
    this.router.navigateByUrl('/checkEdit');
  }
}

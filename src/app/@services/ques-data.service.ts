import { questionVoList, theme, answerList } from './../@interface/ques-interface';
import { Injectable } from '@angular/core';
import { userData, userAccount, create } from '../@interface/ques-interface';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../@http-services/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuesDataService {

  constructor(private httpService: HttpService) { }

  // 一個問卷陣列，每份問卷裡有題目
  editBoolean: boolean = false;
  // 暫存目前被點擊的問卷 ID
  selectedQuizId!: number;

  // 個人檔案假資料
  userData: userData = {
    name: '李李',
    phone: '0912-345-678',
    email: 'imchichi@gmail.com',
    age: 18
  }

  // 登入帳號密碼
  userAccount: userAccount = {
    account: 'imchi',
    password: '1717'
  }

  theme: theme = {
    point: '線上問卷填寫注意事項',
    pointDescription: `感謝您參與本次問卷調查，為了確保您的填答順利且資料正確，請依照實際情況填寫問卷，避免隨意選擇答案，以維護調查結果的準確性。
                    每位受訪者請僅填寫一次問卷，以免影響統計分析。
                    本調查將妥善保護您的隱私，資料僅用於研究與分析，不會對外洩露。
                    填寫問卷時請保持穩定的網路連線，完成後務必點擊「送出」，否則您的答案可能無法保存。`
  }

  create: create = {
    // 問卷假資料
    quiz: {
      id: 1,
      title: 'FAVORITE FOOD',
      description: 'Your usual dining habits | Food Food Food',
      startDate: '2025-11-25',
      endDate: '2025-12-25',
      publish: false,
    },
    // 問題假資料 (複選M / 單選S / 文字選項T)
    questionVoList: [
      {
        questionId: 1,
        name: '喜歡慢慢享受還是速速吃飯?',
        optionsList: [
          { code: 1, optionName: '慢慢享受(純粹吃飯很慢)' },
          { code: 2, optionName: '速速用吞的' },
          { code: 3, optionName: '都可' }
        ],
        type: 'S',
        required: false,
        radioAnswer: 0,
        textAnswer: '',
      },
      {
        questionId: 2,
        name: '鍋燒類的主餐選哪個?',
        optionsList: [
          { code: 1, optionName: '意麵', checkBoolean: false },
          { code: 2, optionName: '雞絲麵', checkBoolean: false },
          { code: 3, optionName: '烏龍麵', checkBoolean: false },
          { code: 4, optionName: '飯', checkBoolean: false },
          { code: 5, optionName: '都加', checkBoolean: false }
        ],
        type: 'M',
        required: false,
        radioAnswer: 0,
        textAnswer: "",
      },
      {
        questionId: 3,
        name: '其他想吃的?',
        type: 'T',
        optionsList: [],
        required: false,
        radioAnswer: 0,
        textAnswer: '',
      }
    ]
  }

  answerList: answerList = {
    questionId: 2,
    optionsList: [
      { code: 1, optionName: '', checkBoolean: false },
      { code: 2, optionName: '', checkBoolean: false },
      { code: 3, optionName: '', checkBoolean: false },
    ],
    radioAnswer: 0,
    textAnswer: "",
  }

  // 即時更新題目
  private questionList$ = new BehaviorSubject<questionVoList[]>([]);
  _questionList$ = this.questionList$.asObservable();

  // 初始化題目
  initQuestionList() {
    this.questionList$.next(this.create.questionVoList || []);
  }

  // 更新題目列表
  updateQuestionList(newList: questionVoList[]) {
    this.create.questionVoList = newList;
    this.questionList$.next(newList);
  }

  // 新增題目
  addQuestion(newQues: questionVoList) {
    let updatedList = [...this.create.questionVoList, newQues]
    this.updateQuestionList(updatedList);
  }

  // 更新某一個題目
  updateQuestion(index: number, newQues: questionVoList) {
    const updatedList = [...this.create.questionVoList];
    updatedList[index] = newQues;
    this.updateQuestionList(updatedList);
  }


  // 判斷登入者
  private admin$ = new BehaviorSubject<boolean>(false);
  _admin$ = this.admin$.asObservable();   // 取得可觀察物件

  // 隱藏admin()
  hide() {
    this.admin$.next(false); // 使用者
  }

  // 打開admin
  show() {
    this.admin$.next(true); // 管理者
  }
}

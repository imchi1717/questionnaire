import { Injectable } from '@angular/core';
import { theme, userData, userAccount, ques, survey } from '../@interface/ques-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuesDataService {

  constructor() { }

  // 一個問卷陣列，每份問卷裡有題目
  allSurveys: survey[] = [];
  editBoolean: boolean = false;

  // 主題假資料
  theme: theme = {
    id: '1',
    mainTitle: 'FAVORITE FOOD',
    subtitle: 'Your usual dining habits | Food Food Food',
    sDate: '2025-10-25',
    eDate: '2025-12-25',
    theme: '線上問卷填寫注意事項',
    describe: `感謝您參與本次問卷調查，為了確保您的填答順利且資料正確，請依照實際情況填寫問卷，避免隨意選擇答案，以維護調查結果的準確性。
              每位受訪者請僅填寫一次問卷，以免影響統計分析。
              本調查將妥善保護您的隱私，資料僅用於研究與分析，不會對外洩露。
              填寫問卷時請保持穩定的網路連線，完成後務必點擊「送出」，否則您的答案可能無法保存。`
  }

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



  // 問題假資料
  // 複選M 單選S 文字選項T
  quesArray: ques[] = [
    {
      quesId: '1',
      required: true,
      quesTitle: '喜歡慢慢享受還是速速吃飯?',
      type: 'S',
      options: ['慢慢享受(純粹吃飯很慢)', '速速用吞的'],
      answer: ''
    },
    {
      quesId: '2',
      required: true,
      quesTitle: '鍋燒類的主餐選哪個?',
      type: 'M',
      options: [
        { name: '意麵', checkBoolean: false },
        { name: '雞絲麵', checkBoolean: false },
        { name: '烏龍麵', checkBoolean: false },
        { name: '飯', checkBoolean: false },
        { name: '都加', checkBoolean: false }
      ],
    },
    {
      quesId: '3',
      required: true,
      quesTitle: '其他想吃的?',
      type: 'T',
      options: [],
      answer: ''
    }
  ]

  // 取得所有題目
  getQues() {
    return this.quesArray;
  }

  // 新增題目
  addSurvey() {
    const newServey: survey = {
      quesArray: structuredClone(this.quesArray) // 深拷貝
    };
    this.allSurveys.push(newServey);
  }

  // 取得主題
  getTheme() {
    return this.theme;
  }

  // 取得所有問卷
  getAllSurveys() {
    return this.allSurveys;
  }

  // 判斷登入者
  private admin$ = new BehaviorSubject<boolean>(false);
  // 取得可觀察物件
  _admin$ = this.admin$.asObservable();

  // 隱藏admin
  hide() {
    this.admin$.next(false);
  }

  // 打開admin
  show() {
    this.admin$.next(true);
  }
}

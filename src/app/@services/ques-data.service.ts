import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuesDataService {

  constructor() { }

  // 個人檔案假資料
  userData = {
    name: '李李',
    phone: '0912-345-678',
    email: 'imchichi@gmail.com',
    age: '18'
  }

  // 登入帳號密碼
  userAccount = {
    account: 'imchi',
    password: '1717'
  }

  // 問題假資料
  // 複選M 單選S 文字選項T
  quesArray = [
    {
      quesId: '1',
      quesTitle: '喜歡慢慢享受還是速速吃飯?',
      type: 'S',
      options: ['慢慢享受(純粹吃飯很慢)', '速速用吞的'],
      answer: ''
    },
    {
      quesId: '2',
      quesTitle: '鍋燒類的主餐選哪個?',
      type: 'M',
      options: [
        { name:'意麵', checkBoolean: false },
        { name:'雞絲麵', checkBoolean: false },
        { name:'烏龍麵', checkBoolean: false },
        { name:'飯', checkBoolean: false },
        { name:'都加', checkBoolean: false }
      ],
    },
    {
      quesId: '3',
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
  addQues(newQues: any) {
    this.quesArray.push({
      ...newQues,
      quesId: (this.quesArray.length + 1).toString(), // 自動編號
    });
  }
}

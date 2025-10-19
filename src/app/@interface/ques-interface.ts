// 主題資料
export interface theme {
  id: string,
  mainTitle: string,
  subtitle: string,
  sDate: string,
  eDate: string,
  theme: string,
  describe: string,
}

// 個人檔案資料
export interface userData {
  name: string,
  phone: string,
  email: string,
  age: number | null,
}

// 登入帳密
export interface userAccount {
  account: string,
  password: string,
}

// 題目基本架構
export interface basicQues {
  quesId: string,
  required: boolean,
  quesTitle: string,
  type: 'S' | 'M' | 'T',
}

export interface survey {
  quesArray: ques[];
}

// 單選題 (S)
export interface singleQues extends basicQues {
  type: 'S',
  options: string [],
  answer: string,
}

// 複選題 (M)
export interface multiQues extends basicQues {
  type: 'M',
  options: multiOptions [],
}

export interface multiOptions {
  name: string,
  checkBoolean: boolean,
}

// 文字題 (T)
export interface textQues extends basicQues {
  type: 'T',
  options: string [],
  answer: string,
}
export type ques = singleQues | multiQues | textQues;

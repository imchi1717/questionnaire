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

export interface theme {
  point: string,
  pointDescription: string,
}

// 問卷資料
export interface create {
  quiz: quiz,
  questionVoList: questionVoList[],
}

export interface quiz {
  id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  publish: boolean,
}



// 題目基本架構
export interface basicQues {
  questionId: number,
  name: string,
  type: 'S' | 'M' | 'T',
  required: boolean,
}

export interface survey {
  create: create;
}

// 單選題 (S)
export interface singleQues extends basicQues {
  type: 'S',
  optionsList: singleOptions[],
  radioAnswer?: number,
  textAnswer?: String,
}

export interface singleOptions {
  code: number,
  optionName: string,
}

// 複選題 (M)
export interface multiQues extends basicQues {
  type: 'M',
  optionsList: multiOptions[],
  radioAnswer?: number,
  textAnswer?: String,
}

export interface multiOptions {
  code: number,
  optionName: string,
  checkBoolean: boolean,
}

// 文字題 (T)
export interface textQues extends basicQues {
  type: 'T',
  optionsList: string[],
  radioAnswer?: number,
  textAnswer?: String,
}
export type questionVoList = singleQues | multiQues | textQues;

export interface answerList {
  questionId: number,
  optionsList: multiOptions[],
  radioAnswer: number,
  textAnswer: String,
}

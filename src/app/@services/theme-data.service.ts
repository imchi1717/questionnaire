import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeDataService {

  constructor() { }

  // 主題假資料
  theme = {
    id: 1,
    mainTitle: 'FAVORITE FOOD',
    subtitle: 'Your usual dining habits | Food Food Food',
    sDate: '2025-10-25',
    eDate: '2025-12-25',
    theme: '吃飯喜好',
    describe: '吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯吃飯',
  }

}

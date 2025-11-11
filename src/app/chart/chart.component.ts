
import { HttpService } from './../@http-services/http.service';
import { QuesDataService } from './../@services/ques-data.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { questionVoList, quiz } from '../@interface/ques-interface';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})


export class ChartComponent implements OnDestroy {

  quiz!: quiz;
  questionVoList: any[] = [];
  optionVo: OptionVo = {
    code: 0,
    optionName: '',
    count: 0
  }

  private charts: { [key: number | string]: Chart } = {};

  constructor(
    private quesDataService: QuesDataService,
    private router: Router,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.quiz = this.quesDataService.create.quiz;
    this.quesDataService._statisticData$.subscribe(data => {
      if (data && data.length > 0) {
        this.questionVoList = data; // 賦予從服務取得的統計數據
        this.cdr.detectChanges();
        Promise.resolve().then(() => {
          this.renderCharts();
        });
      } else {
        console.log('ChartComponent: 統計數據尚未載入或為空。');
      }
    });
  }


  renderCharts() {
    if (!this.questionVoList || !Array.isArray(this.questionVoList)) {
      console.log('ChartComponent: 數據為空，跳過圖表渲染。');
      return;
    }

    for (let questionVo of this.questionVoList) { // 迭代 questionVoList

      // 檢查是否為文字題 (T)
      if (questionVo.type == 'T' || !questionVo.optionsCountList || questionVo.optionsCountList.length == 0) {
        console.log(`題目 ID ${questionVo.questionId} 為文字題，跳過繪圖。`);
        continue;
      }

      let questionId = questionVo.questionId;
      let questionName = questionVo.name;


      // **使用您提供的邏輯來銷毀舊圖表**
      if (this.charts[questionId]) {
        this.charts[questionId].destroy();
        delete this.charts[questionId]; // 使用 delete 運算子移除鍵值
      }

      // 獲取 canvas 元素
      let ctx = document.getElementById(String(questionId)) as HTMLCanvasElement | null;

      if (!ctx) {
        console.error(`ChartComponent: 找不到 ID 為 ${questionVo.questionId} 的 Canvas 元素，跳過繪圖。`);
        continue; // 跳過本次循環
      }

      const optionsListWithCount = questionVo.optionsCountList as unknown as { optionName: string, count: number }[];
      const labels = optionsListWithCount.map(opt => opt.optionName);
      const counts = optionsListWithCount.map(opt => opt.count);

      // 設定數據
      let data = {
        // x 軸文字
        labels: labels,
        datasets: [
          {
            label: '選擇次數',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      // 圖表選項
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: questionName // 使用問題名稱作為標題
          }
        }
      } as const;

      // 創建圖表
      new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
      });
    }
  }

  // 新增：當元件銷毀時，呼叫所有圖表的 destroy 方法，避免記憶體洩漏
  ngOnDestroy(): void {
    console.log('ChartComponent: 正在銷毀所有圖表實例...');
    for (const chartId in this.charts) {
      if (this.charts.hasOwnProperty(chartId) && this.charts[chartId]) {
        this.charts[chartId].destroy();
      }
    }
    this.charts = {}; // 清空儲存物件
  }


  backPage() {
    // 訂閱判斷 admin 狀態
    this.quesDataService._admin$.subscribe(isAdmin => {
      if (isAdmin) {
        this.router.navigateByUrl('/listEdit');
      } else {
        this.router.navigateByUrl('/list');
      }
    }).unsubscribe(); // 用完立即取消訂閱，避免記憶體洩漏
  }

}


export interface OptionVo {
  code: number;
  optionName: string;
  count: number;
}



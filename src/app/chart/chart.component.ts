import { QuesDataService } from './../@services/ques-data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { quiz } from '../@interface/ques-interface';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  quiz!: quiz;
  questionVoList = [
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
      answer: ''
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
    },
    {
      questionId: 3,
      name: '其他想吃的?',
      type: 'T',
      optionsList: [],
      required: false,
      answer: ''
    }
  ]

  constructor(
    private quesDataService: QuesDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quiz = this.quesDataService.create.quiz;
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


  ngAfterViewInit(): void {
    for (let chartData of this.questionVoList) {
      // 獲取 canvas 元素
      let ctx = document.getElementById(chartData.questionId.toLocaleString.toString()) as HTMLCanvasElement;

      // 設定數據
      let data = {
        // x 軸文字
        labels: ['餐費', '交通費', '租金'],
        datasets: [
          {
            // 上方分類文字
            label: '支出比',
            // 數據
            data: [12000, 3000, 9000],
            // 線與邊框顏色
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            //設定hover時的偏移量，滑鼠移上去表會偏移，方便觀看選種的項目
            hoverOffset: 4,
          },
        ],
      };

      // 創建圖表
      let chart = new Chart(ctx, {
        //pie是圓餅圖,doughnut是環狀圖
        type: 'pie',
        data: data,
      });
    }
  }
}

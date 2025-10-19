import { QuesDataService } from './../@services/ques-data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { theme } from '../@interface/ques-interface';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  theme!: theme;
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

  constructor (
    private quesDataService: QuesDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.theme = this.quesDataService.theme
  }


  backPage() {
    this.router.navigateByUrl('/list');
  }


  ngAfterViewInit(): void {
    for(let chartData of this.quesArray) {
      // 獲取 canvas 元素
      let ctx = document.getElementById(chartData.quesId) as HTMLCanvasElement;

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

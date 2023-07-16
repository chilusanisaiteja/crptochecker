import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-crptdetails',
  templateUrl: './crptdetails.component.html',
  styleUrls: ['./crptdetails.component.scss'],
})
export class CrptdetailsComponent implements OnInit {
  coinData: any;
  coinId!: string;
  days: number = 30;
  currency: string = 'INR';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {},
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private currencyservice: CurrencyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => (this.coinId = val['id']));
    this.getCoinData();
    this.getChartData();
    this.currencyservice.getcurrency().subscribe((val) => {
      this.currency = val;
      this.getCoinData();
      this.getChartData();
    });
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
      console.log(this.coinData);
    });
  }

  getChartData() {
    this.api.getGraphData(this.coinId, this.currency, 30).subscribe((res) => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a: any) => {
        let date = new Date(a[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return this.days === 1 ? time : date.toLocaleDateString();
      });
    });
  }
}

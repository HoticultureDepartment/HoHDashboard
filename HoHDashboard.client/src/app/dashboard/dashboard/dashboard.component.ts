import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FetchAPIsService } from '../../fetch-apis.service';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatPaginator, MatPaginatorModule, MatTableModule, HighchartsChartModule, MatSortModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  usersList: any = [];
  beneficiaryList: any = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  fyExpenditure: any;

  displayedColumns: string[] = ['uidByDepartment', 'fyYear', 'schemeName', 'componantName', 'beneficiaryName', 'fatherName', 'villageName', 'blockName', 'districtName', 'mobileNo', 'familyID', 'claimID', 'category', 'gender', 'areaNosPerUnit', 'subsidyAmountToFarmer', 'cropName', 'transactionType'];
  dataSource = new MatTableDataSource<any>(this.beneficiaryList);

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = new MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null = new MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getTableColumns(): string[] {
    return ['actions', ...this.displayedColumns];
  }

  GetTotalFYExpenditure() {
    this.fetchApi.FyYearSubsidyAmount().subscribe((res: any) => {
      this.fyExpenditure = res;
      if (this.fyExpenditure != null && this.fyExpenditure != undefined) {
        const processedData = this.processChartData(res);
        this.updateChart(processedData, 'line');
      }
    }, (err: any) => {
      console.error("Error fetching data:", err);
    });
  }


  constructor(private fetchApi: FetchAPIsService, private router: Router) {

    // this.chartOptions = {
    //   title: {
    //     text: 'Total FY Expenditure'
    //   },
    //   // subtitle: {
    //   //   text: 'Source: WorldClimate.com'
    //   // },
    //   credits: {
    //     enabled: false
    //   },
    //   xAxis: {
    //     title: {
    //       text: 'FY Year'
    //     },
    //     categories: []
    //   },
    //   yAxis: {
    //     title: {
    //       text: 'Total Expenditure'
    //     }
    //   },
    //   series: []
    // };
  }

  private processChartData(apiData: any[]): {
    categories: string[],
    series: Highcharts.SeriesOptionsType[]
  } {
    const categories = new Set<string>();
    const seriesMap: { [key: string]: { [year: string]: number } } = {};

    // Extract categories (years) & organize data
    apiData.forEach(item => {
      categories.add(item.fyYear);

      if (!seriesMap[item.scheme]) {
        seriesMap[item.scheme] = {};
      }
      seriesMap[item.scheme][item.fyYear] = Number(item.totalSubsidyAmount) || 0;
    });

    const sortedCategories = Array.from(categories).sort();

    // Convert to Highcharts series format
    const seriesData: Highcharts.SeriesLineOptions[] = Object.keys(seriesMap).map(scheme => {
      return {
        name: scheme,
        type: 'line',
        data: sortedCategories.map(year => seriesMap[scheme][year] || 0) // Fill missing years with 0
      };
    });

    return {
      categories: sortedCategories,
      series: seriesData
    };
  }

  private updateChart(processData: {
    categories: string[],
    series: Highcharts.SeriesOptionsType[]
  }, chartType: string = 'line') {

    this.chartOptions = {
      title: { text: 'Total Financial Year Expenditure' },
      credits: { enabled: false },
      xAxis: {
        type: 'category',
        categories: processData.categories,
        title: { text: 'Financial Year' }
      },
      yAxis: {
        title: { text: 'Total Expenditure (₹)' },
        labels: {
          formatter: function () {
            return `₹${this.value.toLocaleString('en-IN')}`;
          }
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>₹{point.y:,.0f}</b>'
      },
      series: processData.series.map(seriesItem => ({
        ...seriesItem,
        type: chartType as any
      }))
    };
  }

  onButtonClick(element: any) {
    console.table(element);
  }

  public Beneficiaries() {
    this.fetchApi.Beneficiaries().subscribe((res: any) => {
      this.beneficiaryList = res;
      this.dataSource.data = res;
    }, (err: any) => { console.log(err) })
  }

  public UserList() {
    this.fetchApi.Users().subscribe((res: any) => {
      this.usersList = res;
      this.dataSource.data = res;
    }, (err: any) => {
      console.log(err);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    // this.UserList();
    this.Beneficiaries();
    this.GetTotalFYExpenditure();
  }
}


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
  chartOptions: Highcharts.Options;




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

  constructor(private fetchApi: FetchAPIsService, private router: Router) {

    this.chartOptions = {
      title: {
        text: 'Monthly Average Temperature'
      },
      subtitle: {
        text: 'Source: WorldClimate.com'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)'
        }
      },
      series: [{
        name: 'Tokyo',
        type: 'line',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'London',
        type: 'line',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
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
  }
}


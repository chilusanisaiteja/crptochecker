import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-crptolist',
  templateUrl: './crptolist.component.html',
  styleUrls: ['./crptolist.component.scss'],
})
export class CrptolistComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  currency: string = 'INR';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private api: ApiService,
    private router: Router,
    private currencyservice: CurrencyService
  ) {}
  displayedColumns: string[] = [
    'symbol',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];
  bannerData: any;
  users: any;

  ngOnInit(): void {
    this.getBannerData();
    this.getAllData();
    this.currencyservice.getcurrency().subscribe((val) => {
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    });
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((res) => {
      this.bannerData = res;
    });
  }

  getAllData() {
    this.api.getCurrencyData(this.currency).subscribe((res) => {
      console.log(res);
      this.users = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['crptdetail', row.id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-dealer-table',
  templateUrl: './dealer-table.component.html',
  styleUrls: ['./dealer-table.component.css'],
})
export class DealerTableComponent implements OnInit {
  dealers: any[] = [];
  selectedDealer: any = null;
  displayedColumns: string[] = [
    'id',
    'name',
    'company_name',
    'mobile_no',
    'whatsapp_no',
    'email',
    'date_of_birth',
    'pan_no',
    'actions',
  ];

  constructor(private dealerService: DealerService) {}

  ngOnInit(): void {
    this.fetchDealers();
  }

  fetchDealers(): void {
    this.dealerService.getDealers().subscribe((data) => {
      this.dealers = data;
    });
  }

  editDealer(dealer: any): void {
    this.selectedDealer = dealer;
  }

  deleteDealer(id: number): void {
    this.dealerService.deleteDealer(id).subscribe(() => {
      this.fetchDealers();
    });
  }

  onFormSubmit(): void {
    this.selectedDealer = null;
    this.fetchDealers();
  }
}

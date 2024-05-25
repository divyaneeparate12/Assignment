import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-dealer-form',
  templateUrl: './dealer-form.component.html',
  styleUrls: ['./dealer-form.component.css'],
})
export class DealerFormComponent implements OnInit {
  @Input() dealer: any;
  @Output() formSubmit = new EventEmitter<void>();
  dealerForm: FormGroup;
  errorMessage!: string;
  successMessage: string | null = null;

  constructor(
    private dealerService: DealerService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.dealerForm = this.fb.group({
      name: ['', [Validators.required,]], 
      company_name: ['', [Validators.required,]],
      mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      whatsapp_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      email: ['', [Validators.required,]], 
      date_of_birth: ['', Validators.required],
      pan_no: ['', [Validators.required,]], 
    });
  }

  ngOnInit(): void {
    this.dealerForm = this.fb.group({
      name: ['', [Validators.required,]], 
      company_name: ['', [Validators.required,]],
      mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      whatsapp_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      email: ['', [Validators.required,]], 
      date_of_birth: ['', Validators.required],
      pan_no: ['', [Validators.required,]], 
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.dealerService.getDealer(params['id']).subscribe((dealer) => {
          this.dealer = dealer;
          this.dealerForm.patchValue(this.dealer);
        });
      }
    });

    if (this.dealer) {
      this.dealerForm.patchValue(this.dealer);
    }
  }

  onSubmit(): void {
    if (this.dealer) {
      this.dealerService
        .updateDealer(this.dealer.id, this.dealerForm.value)
        .subscribe(
          () => {
            this.formSubmit.emit();
            this.successMessage = 'Dealer updated successfully';
          },
          (error) => {
            this.errorMessage = `Error updating dealer: ${error}`;
          }
        );
    } else {
      this.dealerService.createDealer(this.dealerForm.value).subscribe(
        () => {
          this.formSubmit.emit();
          this.successMessage = 'Dealer created successfully';
        },
        (error) => {
          this.errorMessage = `Error creating dealer: ${error}`;
        }
      );
    }
  }
}


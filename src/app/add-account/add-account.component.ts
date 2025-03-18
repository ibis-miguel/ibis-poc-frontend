import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { ToastService } from '../services/toast.service';
import { BankBranch, BankBranchService } from '../services/bank-branch.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    CommonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DatePickerModule,
    SelectModule,
    AutoCompleteModule,
    InputNumberModule 
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent implements OnInit {

  datePickerStyles = {
    'width': '200px'
  };

  accountTypeOptions = [
    { label: 'Savings', value: 'SAVINGS' },
    { label: 'Loan', value: 'LOAN' },
    { label: 'Credit Card', value: 'CREDIT_CARD' },
    { label: 'Current Account', value: 'CURRENT_ACCOUNT' },
  ]

  currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'ANG', value: 'ANG' },
  ]

  accountForm: FormGroup;
  banks: BankBranch[] | undefined;
  filteredBanks: BankBranch[] = [];

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, 
    private toastService: ToastService, 
    private bankbranchService: BankBranchService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.bankbranchService.getAllBanks();
    this.bankbranchService.banks$.subscribe((banks) => {
      this.banks = banks;
    });
  }


  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.addAccount(this.accountForm.value).subscribe(response => {
        this.toastService.ShowSucces('Account Added Succesfully.')
        this.accountForm.reset();
      }, error => {
        this.toastService.ShowError('Adding Account failed!')
        console.log('error tying to save Account: ', error)
      });

    } else {
      this.toastService.ShowInfo('Adding Account failed but... ')
      console.log('no error but it still didnt save, Account')
    }
  }

  filterBank(event: { query: string }): void {
    const query = event.query.toLowerCase();
    this.filteredBanks = (this.banks || []).filter(bank =>
      bank.bankName.toLowerCase().includes(query)
    );
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }

}

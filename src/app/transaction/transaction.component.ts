import { Component, OnInit } from '@angular/core';
import { CardModule } from "primeng/card"
import { TableModule } from "primeng/table"
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { BankBranch, BankBranchService } from '../services/bank-branch.service';
import { TransactionService } from '../services/transaction.service';
import { AutoComplete } from 'primeng/autocomplete';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputNumberModule,
    AutoComplete
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {

  transactionForm!: FormGroup;
  banks: BankBranch[] | undefined;
  filteredBanks: BankBranch[] = [];

  constructor(private fb: FormBuilder, 
    private transactionService: TransactionService, 
    private bankbranchService: BankBranchService,
    private toastService: ToastService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      senderAccount: ['', Validators.required],
      receiverAccount: ['', Validators.required],
      amount: ['', Validators.required],
      description: [''],
      originatingBranch: ['', Validators.required],
    });

    this.bankbranchService.getAllBanks();
    this.bankbranchService.banks$.subscribe((banks) => {
      this.banks = banks;
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value).subscribe(response => {
        this.toastService.ShowSucces('Transaction Added Succesfully.')
        this.transactionForm.reset();
      }, error => {
        this.toastService.ShowError('Adding Transaction failed!')
        console.log('Error tying to save Transaction: ', error)
      });

    } else {
      this.toastService.ShowInfo('Adding Transaction failed but... ')
      console.log('no error but it still didnt save, Transaction')
    }
  }


  filterBank(event: { query: string }): void {
    const query = event.query.toLowerCase();
    this.filteredBanks = (this.banks || []).filter(bank =>
      bank.bankName.toLowerCase().includes(query)
    );
  }

  navigateToPerson() {
    this.router.navigate(['/person']);
  }

  navigateToBankBranch() {
    this.router.navigate(['/bankbranch']);
  }

  navigateToAccount() {
    this.router.navigate(['/account']);
  }

  navigateToRecord() {
    this.router.navigate(['/record']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TransactionDisplay, TransactionService } from '../services/transaction.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-display-account',
  standalone: true,
  imports: [CardModule, TableModule, CommonModule, TagModule, InputTextModule, FormsModule, ButtonModule],
  templateUrl: './display-account.component.html',
  styleUrl: './display-account.component.css'
})
export class DisplayAccountComponent {
  accountNumber: string | undefined;
  transactions: TransactionDisplay[] = [];
  private subscription: Subscription | undefined;

  constructor(private transactionService: TransactionService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchTransactions(): void {
    if (this.accountNumber) {
      this.subscription = this.transactionService.getTransactionsByAccount(this.accountNumber)
        .subscribe((data) => {
          this.transactions = data;
        }, (error) => {
            this.toastService.ShowError('Error fetching transactions: ' +  error.message);
          // console.error('Error fetching transactions:', error);
        });
    } else {
      this.toastService.ShowWarn('Account number is undefined');
    }
  }

  getSeverity(status: string): 'success' | 'warn' | 'info' | undefined {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'warn';
      case 'PENDING':
        return 'info';
      default:
        return undefined;
    }
  }
  

  navigateToHome() {
    this.router.navigate(['/']);
  }
}

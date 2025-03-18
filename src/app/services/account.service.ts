import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

enum AccountType {
  SAVINGS = "SAVINGS",
  LOAN = "LOAN",
  CREDIT_CARD = "CREDIT_CARD",
  CURRENT_ACCOUNT = "CURRENT_ACCOUNT",

}

enum Currency {
  USD = "USD",
  EUR = "EUR",
  ANG = "ANG",
}

export interface Account {
  accountNumber: string,
  accountType: AccountType,
  createdAt: string,
  currency: Currency,
  firstName: string,
  lastName: string,
  bankName: string,
  balance: number
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/account';

  constructor(private http: HttpClient) { }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

enum Status {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export interface Transaction{
  amount: number, 
  description: string,
  senderAccount: string,
  receiverAccount: string,
  status?: Status,
  originatingBranch: string 
}

export interface TransactionDisplay{
amount: number,
sender: string, 
receiver: string, 
bank: string,
date: string, 
description: string, 
status: Status
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
private baseUrl = `${environment.apiUrl}/transaction`;

  constructor(private http: HttpClient) {}

  addTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  getTransactionsByAccount(accountNumber: string): Observable<TransactionDisplay[]> {
    const params = new HttpParams().set('accountNumber', accountNumber);
    return this.http.get<TransactionDisplay[]>(`${this.baseUrl}/account`, { params });
  }
}



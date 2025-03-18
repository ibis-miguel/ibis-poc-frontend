import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

export interface BankBranch {
  bankName: string,
  branchName: string,
  bankAddress: string
}

@Injectable({
  providedIn: 'root'
})
export class BankBranchService {
  private banksSubject = new BehaviorSubject<BankBranch[]>([]);
  banks$ = this.banksSubject.asObservable();

  private baseUrl = 'http://localhost:8080/bank';

  constructor(private http: HttpClient) { }

  addBankBranch(bankbranch: BankBranch): Observable<BankBranch> {
    return this.http.post<BankBranch>(this.baseUrl, bankbranch);
  }

  getAllBanks(): void {
    this.http.get<BankBranch[]>(`${this.baseUrl}/all`).pipe(
      catchError((err) => {
        console.error('Error fetching Banks:', err);
        this.banksSubject.next([]); 
        return of([]); 
      })
    ).subscribe((banks) => {
      this.banksSubject.next(banks); 
    });
  }
}

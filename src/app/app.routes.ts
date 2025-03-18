import { Routes } from '@angular/router';

import {TransactionComponent} from './transaction/transaction.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { AddBankBranchComponent } from './add-bank-branch/add-bank-branch.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DisplayAccountComponent } from './display-account/display-account.component';

export const routes: Routes = [
  { path: '', component: TransactionComponent },
  { path: 'person', component: AddPersonComponent },
  { path: 'bankbranch', component: AddBankBranchComponent },
  { path: 'account', component: AddAccountComponent },
  { path: 'record', component: DisplayAccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { BankBranchService } from '../services/bank-branch.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank-branch',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, FloatLabel, ReactiveFormsModule],
  templateUrl: './add-bank-branch.component.html',
  styleUrl: './add-bank-branch.component.css'
})
export class AddBankBranchComponent {

  bankbranchForm: FormGroup;

  constructor(private fb: FormBuilder, private bankbranchService: BankBranchService, private toastService: ToastService, private router: Router
  ){

    this.bankbranchForm = this.fb.group({
      bankName: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      bankAddress: new FormControl('')
    })
  }

  onSubmit() {
    if (this.bankbranchForm.valid) {
      this.bankbranchService.addBankBranch(this.bankbranchForm.value).subscribe(response => {
        this.toastService.ShowSucces('Bank Branch Added Succesfully.')
        this.bankbranchForm.reset();
      }, error => {
        this.toastService.ShowError('Adding Bank Branch failed!')
        console.log('error tying to save Bank Branch: ', error)
      });

    } else {
      this.toastService.ShowInfo('Adding Bank Branch failed but... ')
      console.log('no error but it still didnt save, Bank Branch') }
  }


  navigateToHome() {
    this.router.navigate(['/']);
  }
}

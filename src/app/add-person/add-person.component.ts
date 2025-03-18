import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PersonService } from '../services/person.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {

  personForm: FormGroup;

  constructor(private fb: FormBuilder, private personService: PersonService, private toastService: ToastService, private router: Router) {

    this.personForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      this.personService.addPerson(this.personForm.value).subscribe(response => {
        this.toastService.ShowSucces('Person Added Succesfully.')
        this.personForm.reset();
      }, error => {
        this.toastService.ShowError('Adding person failed!')
        console.log('error tying to save person: ', error)
      });

    } else {
      this.toastService.ShowInfo('Adding person failed but... ')
      console.log('no error but it still didnt save, person') }
  }


  navigateToHome() {
    this.router.navigate(['/']);
  }
}

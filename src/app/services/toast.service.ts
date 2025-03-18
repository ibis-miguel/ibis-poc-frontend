import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {}

  ShowSucces(message: string){
    this.messageService.add({severity:'success', summary: 'Success', detail: message, life: 3000});
  }
  ShowError(message: string){
    this.messageService.add({severity:'error', summary: 'Error', detail: message, life: 3000});
  }
  ShowInfo(message: string){
    this.messageService.add({severity:'info', summary: 'Info', detail: message, life: 3000});
  }
  ShowWarn(message: string){
    this.messageService.add({severity:'warn', summary: 'Warning', detail: message, life: 3000});
  }
}

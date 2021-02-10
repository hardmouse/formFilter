import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showApproved(message, title){
    this.toastr.clear();
    this.toastr.show(message, title, {
      closeButton: true,
      disableTimeOut: true,
      enableHtml: true,
      titleClass: 'toast-note-approve'
    })
  }
  showRejected(message, title){
    this.toastr.clear();
    this.toastr.error(message, title, {
      closeButton: true,
      disableTimeOut: true,
      enableHtml: true,
      titleClass: 'toast-note-reject'
    })
  }
  showDelegated(message, title){
    this.toastr.clear();
    this.toastr.error(message, title, {
      closeButton: true,
      disableTimeOut: true,
      enableHtml: true,
      titleClass: 'toast-note-delegate'
    })
  }
  showLimitedNote(message, title, duration=3000){
    this.toastr.show(message, title, {
      timeOut : duration,
      enableHtml: true,
      titleClass: 'toast-note'
    })
  }
  clearToastr(){
    this.toastr.clear();
  }
  // showSuccess(message, title, duration=30000){
  //   this.toastr.success(message, title, {
  //     timeOut : duration
  //   })
  // }
  // showNotification2(message, title){
  //   this.toastr.show(message, title, {
  //     closeButton: true,
  //     disableTimeOut: true
  //   })
  // }
  // showError(message, title){
  //   this.toastr.error(message, title, {
  //     closeButton: true,
  //     disableTimeOut: true
  //   })
  // }
}

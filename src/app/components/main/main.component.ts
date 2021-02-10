import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showModal:boolean=false;
  stat:number = 0;
  stats:any = [true,true,true];
  showDetail:boolean = true;
  isCheckAll:boolean = false;
  constructor(
    private notifyService : NotificationService,
    private modalService: ModalService,
    private fb: FormBuilder
    ) { }
  approvalForm: FormGroup;
  // checkboxForm: FormGroup;
  // buttonForm: FormGroup;
  
  ngOnInit(): void {
    const checkbox = this.fb.group({
      requestItems:[],
      checkBoxs: []
    })
    const footerButtons = this.fb.group({
      buttons:[]
    })
    this.approvalForm = this.fb.group({
      checkboxForm:checkbox,
      buttonForm:footerButtons
    })
  }

  toggle(_v){
    this.stat = _v;
  }
  detailShow(){
    this.showDetail = !this.showDetail;
  }
  selectStat(_v){
    this.stats[_v] = !this.stats[_v];
  }
  checkAll(){
    this.isCheckAll = !this.isCheckAll;
  }

  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
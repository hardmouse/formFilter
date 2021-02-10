import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';
import { InputConReturn, RequestReturn } from '../../module/common.model';
@Component({
  selector: 'app-footer-action',
  templateUrl: './footer-action.component.html',
  styleUrls: ['./footer-action.component.scss']
})
export class FooterActionComponent implements OnInit {

  footerModal = 'footer-reject-modal';

  delegateCheck:boolean = false;
  delegateObj:any=[];

  approverList:any=[];
  approverListFiltered:any=[];
  approverSearchValue:string="";
  approverNoResult:boolean = false;
  approverTableShow:boolean = false;

  approverHeaders:any=["First Name","Last Name","Known As","Email","Phone","Client Business Group"];
  @Input() approvalForm: FormGroup;
  constructor(
    public dataService: DataService,
    private modalService: ModalService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.getApprovers();
  }
  getApprovers(){
    this.dataService.getData().subscribe( data => {
      this.approverListFiltered = this.approverList = data[0].requestList.approvers;
      
      // console.log(data[0].requestList.approvers);
      for(let i=0; i< this.approverList.length;i++){
        // console.log(this.approverList[i]);
      }
    });
  }
  stripHtml(html){
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  sortItems(delegate:boolean=false){
    let msgBody:any;
    let requestedItem = this.approvalForm.value.checkboxForm.value.requestedItem;
    let changedItems=[];
    if(delegate){
      for(let i=0; i < requestedItem.length; i++){
        let _temp:RequestReturn = new RequestReturn;
        _temp.name = requestedItem[i].name;
        for(let j=0; j<requestedItem[i].requestedItemDetail.length;j++){
          if(requestedItem[i].requestedItemDetail[j].isCheckedDetail){
            _temp.detail.push(requestedItem[i].requestedItemDetail[j]);
            _temp.isCheck = true;
            this.delegateCheck = true;
          }
        }
        changedItems.push(_temp);
      }
      msgBody = changedItems;
    }else{
      console.log(requestedItem);
      for(let i=0; i < requestedItem.length; i++){
        for(let j=0; j<requestedItem[i].requestedItemDetail.length;j++){
          if(requestedItem[i].requestedItemDetail[j].isCheckedDetail){
            
            changedItems.push(requestedItem[i].name+" - "+requestedItem[i].requestedItemDetail[j].name);
          }
        }
      }
      msgBody = `<ul>`;
      for(let i=0;i<changedItems.length;i++){
        msgBody += "<li>"+changedItems[i]+"</li>";
      }
      msgBody += `</ul>`;
    }
    return msgBody;
  }
  approve(){
    console.clear();
    let msgBody = this.sortItems();
    if(this.stripHtml(msgBody)==""){
      this.notifyService.showLimitedNote("Nothing checked.", "Note:");
    }else{
      this.notifyService.showApproved(msgBody, "APPROVED:");
    }
  }
  reject(){
    console.clear();
    let msgBody = this.sortItems();
    if(this.stripHtml(msgBody)==""){
      this.notifyService.showLimitedNote("Nothing checked.", "Note:");
    }else{
      this.notifyService.showRejected(msgBody, "REJECTED:");
    }
  }
  delegate(_approver){
    console.clear();
    let msgBody = this.sortItems();
    this.closeModal(this.footerModal);
    this.notifyService.showDelegated(msgBody, "The following building item(s) have been delegated to "+_approver.fname + " " +_approver.lname );
  }
  delegateSelect(){
    this.openModal(this.footerModal);
  }

  openModal(id: string) {
    console.clear();
    this.delegateObj = this.sortItems(true);
    console.log("delegateCheck:",this.delegateCheck,this.delegateObj);
    if(!this.delegateCheck){
      this.notifyService.showLimitedNote("Nothing checked.", "Note:");
    }else{
      this.notifyService.clearToastr();
      this.modalService.open(id);
    }
  }

  closeModal(id: string) {
    this.delegateObj=[];
    this.delegateCheck = false;
    this.modalService.close(id);
  }
  approverSearchChange(_rv:InputConReturn){
    this.approverSearchValue = (_rv.value!==undefined)?_rv.value.trim():"";
    this.approverListFiltered = [];
    this.approverList.forEach(u=>{
      let _fn = this.approverSearchValue.toLocaleLowerCase();
      if(
        u.fname.toLocaleLowerCase().indexOf(_fn)>=0 ||
        u.lname.toLocaleLowerCase().indexOf(_fn)>=0 ||
        u.known.toLocaleLowerCase().indexOf(_fn)>=0 ||
        u.email.toLocaleLowerCase().indexOf(_fn)>=0 ||
        u.phone.toLocaleLowerCase().indexOf(_fn)>=0
        ){
        this.approverListFiltered.push(u);
      }
    });
    
    if(this.approverListFiltered.length > 0 && this.approverSearchValue != ""){
      this.approverTableShow = true;
      this.approverNoResult = false;
    }else{
      this.approverTableShow = false;
      if(this.approverSearchValue!=""){
        this.approverNoResult = true;
      }else{
        this.approverNoResult = false;
      }
      
    }
  }
  selectApprover(_data){
    this.delegate(_data);
  }
  hideReasonSearch(){

  }
  conclick(){

  }
}
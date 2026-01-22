import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';

import { InputConReturn } from '../../module/common.model';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})

export class SearchTableComponent implements OnInit { //, OnChanges
  @Input() stat: number=0;
  @Input() checkAll:boolean=false;
  @Input() showDetail: boolean = true;
  @Input() stats:any = [true,true,true];
  @Input() approvalForm: FormGroup;
  openAll:boolean = true;
  checkboxForm: FormGroup;
  checkboxFilteredForm: FormGroup;
  catagory = ["Building Item and Update Field","Status","Old Value","New Value","Reason for Rejection","Location","System Type","Client","Approver","Date","Comments"]

  showReasonSearchDialog:any = [];
  showReasonNoResult:any = [];
  reasonSearchValue:string = "";
  reasonSearchFilter: any =[];
  presetReasonList = [
    "Equipment already exists",
    "The wrong information was entered",
    "The wrong action was chosen",
    "Add not approved by Facility/Regional Manager"];

  requestsListView:any = [];
  requestsListFiltered:any = [];
  requestsListSearchArray:any = [];

  constructor(
    public dataService: DataService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private notifyService : NotificationService
    ) { }

  requestedItem():FormArray {
    return this.checkboxForm.get('requestedItem') as FormArray
  }

  requestedItemDetail(_i:number):FormArray {
    return this.requestedItem().at(_i).get('requestedItemDetail') as FormArray
  }

  ngOnInit(): void {
    this.getDataList();
  }

  onCheckAll(){
    this.checkAll = !this.checkAll;
    this.checkAllItems(this.checkAll);
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   let chk = changes.checkAll.currentValue;
  //   this.checkAllItems(chk);
  // }

  checkAllItems(_c){
    for(let i=0;i<this.requestsListView.length;i++){
      this.requestsListView[i].isChecked = _c;
      this.checkByGroup(i, _c);
    }
    if(_c){
      this.notifyService.showLimitedNote("", "All item Checked:");
    }
  }

  addRequestItem(_item){
    this.requestedItem().push(_item);
  }

  removeRequestItem(_itemIndex:number) {
    this.requestedItem().removeAt(_itemIndex);
  }

  addRequestItemDetail(_i,_detail){
    this.requestedItemDetail(_i).push(_detail);
  }

  // removeRequestItemDetail(_itemIndex:number) {
  //   this.requestedItem().removeAt(_itemIndex);
  // }

  async getDataList(){
    this.checkboxForm = this.fb.group({
      // requestItemData:[],
      requestedItem: this.fb.array([])
    })
    this.dataService.getData().subscribe( data => {
      for(let i=0; i< data[0].requestList.Item.length;i++){
        data[0].requestList.Item[i].isChecked = false;
        data[0].requestList.Item[i].isOpen = true;
        this.showReasonSearchDialog.push([]);
        // this.showReasonNoResult.push([]);
        const newItem = this.fb.group({
          name:data[0].requestList.Item[i].name,
          isChecked:data[0].requestList.Item[i].isChecked,
          requestedItemDetail:this.fb.array([])
        });
        this.addRequestItem(newItem);
        for(let j=0; j<data[0].requestList.Item[i].updated.length;j++){
        data[0].requestList.Item[i].updated[j].isCheckedDetail = false;
        data[0].requestList.Item[i].updated[j].reason = "";
        this.showReasonSearchDialog[i].push(false);
        // this.showReasonNoResult[i].push(false);
          const newDetail = this.fb.group({
            name:data[0].requestList.Item[i].updated[j].name,
            previous:data[0].requestList.Item[i].updated[j].previous,
            current:data[0].requestList.Item[i].updated[j].current,
            approver:data[0].requestList.Item[i].updated[j].approver,
            isCheckedDetail:data[0].requestList.Item[i].updated[j].isCheckedDetail,
            reason:data[0].requestList.Item[i].updated[j].reason
          });
          this.addRequestItemDetail(i,newDetail);
        }
      }
      // this.checkboxForm.value.requestItemData = this.requestsListView = data[0].requestList.Item;
      this.requestsListFiltered = this.requestsListView = data[0].requestList.Item;
      this.approvalForm.value.checkboxForm = this.checkboxForm;
      this.approvalForm.value.checkboxFilteredForm = this.checkboxForm;
      // console.log(this.checkboxForm.value.requestItemData);
      console.log(this.requestsListView);
    })
    // this.checkboxForm.valueChanges.subscribe(newVal => {
    //   console.log(newVal, this.approvalForm);
    // })
  }

  // checkVisible(_st,_name){
  //   if(_st==0){
  //     return true;
  //   }else if(_st==1 && _name=="pending"){
  //     return true;
  //   }else if(_st==2 && _name=="approved"){
  //     return true;
  //   }else if(_st==3 && _name=="rejected"){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  // checkVisible2(_name){
  //   if(this.stats[0] && _name=="pending"){
  //     return true;
  //   }else if(this.stats[1] && _name=="approved"){
  //     return true;
  //   }else if(this.stats[2] && _name=="rejected"){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  checkByGroup(_group,_checked){
    const { checked } = _checked;
    if(typeof(_checked)=='boolean'){
      this.approvalForm.value.checkboxForm.value.requestedItem[_group].isChecked = _checked;
      this.requestsListFiltered[_group].isChecked = _checked;
    }else{
      this.approvalForm.value.checkboxForm.value.requestedItem[_group].isChecked = checked;
      this.requestsListFiltered[_group].isChecked = checked;
    }
    
    for(let i=0;i<this.requestsListFiltered[_group].updated.length;i++){
      this.requestsListFiltered[_group].updated[i].isCheckedDetail = _checked;
      this.checkRequestListDetail(_group,i,_checked,"group")
    }
    // if(checked){
    //   this.notifyService.showLimitedNote(this.requestsListFiltered[_group].name, "Building item have been Checked:");
    // }else{
    //   this.notifyService.showLimitedNote(this.requestsListFiltered[_group].name, "Building item have been unChecked:");
    // }
    console.log("_checked",_checked,"         checked",checked);
  }
 
  checkRequestListDetail(_group,_item,_e,_ext=""){
    const { checked } = _e;
    if(typeof(_e)=='boolean'){
      this.approvalForm.value.checkboxForm.value.requestedItem[_group].requestedItemDetail[_item].isCheckedDetail = _e;
      this.requestsListFiltered[_group].updated[_item].isCheckedDetail = _e;
    }else{
      this.approvalForm.value.checkboxForm.value.requestedItem[_group].requestedItemDetail[_item].isCheckedDetail = checked;
      this.requestsListFiltered[_group].updated[_item].isCheckedDetail = checked;
    }
    // Checking group checkbox when checking each detail item, 
    if(_ext=="single"){
      let _isCheckedBe:Boolean=true;
      for(let i=0;i<this.requestsListFiltered[_group].updated.length;i++){
        let _temp = this.requestsListFiltered[_group].updated[i];
        console.log(i,"<<single:",_temp.isCheckedDetail);
        if(!this.requestsListFiltered[_group].updated[i].isCheckedDetail){
          _isCheckedBe = false;
        }
      }
      this.approvalForm.value.checkboxForm.value.requestedItem[_group].isChecked = _isCheckedBe;
      this.requestsListFiltered[_group].isChecked = _isCheckedBe;
    }
    // if(_e){
    //   this.notifyService.showLimitedNote(this.requestsListFiltered[_group].name+" > "+this.requestsListFiltered[_group].updated[_item].name, "Building sub item have been Checked:");
    // }else{
    //   this.notifyService.showLimitedNote(this.requestsListFiltered[_group].name+" > "+this.requestsListFiltered[_group].updated[_item].name, "Building sub item have been unChecked:");
    // }
    // console.log("group:",_group, " item:", _item, " valueb(_e):",_e, "from:", _ext);
  }
  checkRowDetail(_group,_item,_ext="single"){
    this.requestsListFiltered[_group].updated[_item].isCheckedDetail = !this.requestsListFiltered[_group].updated[_item].isCheckedDetail;
    this.checkRequestListDetail(_group,_item,this.requestsListFiltered[_group].updated[_item].isCheckedDetail,"single");
  }
  checkItemCollapse(_group){
    this.requestsListFiltered[_group].isOpen = !this.requestsListFiltered[_group].isOpen;
  }
  checkAllCollapse(){
    this.openAll = !this.openAll;
    for(let i=0; i < this.requestsListFiltered.length;i++){
      this.requestsListFiltered[i].isOpen = this.openAll;
    }
  }

  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  hideSearchs(){

  }

  updateReasonValue(_group,_item,_val){
    this.requestsListFiltered[_group].updated[_item].reason = _val;
    this.checkboxForm.value.requestedItem[_group].requestedItemDetail[_item].reason = _val;
  }
  reasonTextOnChang(_rv :InputConReturn,_group,_item){
    // console.log(_rv);
    this.reasonSearchValue = (_rv.value!==undefined)?_rv.value.trim():"";
    this.updateReasonValue(_group,_item,this.reasonSearchValue);
    this.reasonSearchFilter = [];
    this.presetReasonList.forEach(u=>{
      let _v = u;
      if(_v.toLocaleLowerCase().indexOf(this.reasonSearchValue.toLocaleLowerCase())>=0){
        this.reasonSearchFilter.push(u);
      }
    });
    if(this.reasonSearchFilter.length >0){
      this.showReasonSearchDialog[_group][_item] = true;
      // this.showReasonNoResult[_group][_item] = false;
    }else{
      this.showReasonSearchDialog[_group][_item] = true;
      // if(this.reasonSearchFilter.length==0){
      //   this.showReasonNoResult[_group][_item] = true;
      // }else{
      //   this.showReasonNoResult[_group][_item] = false;
      // }
    }

    console.log(this.checkboxForm.value.requestedItem);
    console.log(this.requestsListFiltered);
  }
  hideReasonSearch(){

  }
  resetReasonInput(){

  }
  selectTheReason(_pick,_group,_item){
    this.updateReasonValue(_group,_item,this.reasonSearchFilter[_pick])
    console.log(_pick,this.requestsListFiltered[_group].updated[_item].reason);
    this.reasonSearchFilter = [];
    this.showReasonSearchDialog[_group][_item]=false;
  }




  filterTextOnChang(_irv :InputConReturn,_cata){
    console.log(_irv,_cata);
  }
}
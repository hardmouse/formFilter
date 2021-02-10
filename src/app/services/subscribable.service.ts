import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
// import { EquipmentSubHeader } from '../common/type/common.model';
// import { ClientForSelectResponseModel, UserInfoResponseModel } from '../modules/security/classes/authModels';

@Injectable({
  providedIn: 'root'
})
export class SubscribableService {
  public Mode:string = "";
  public EditBuildingId:string="";
  public BuildingItemCode:string="";
  // public userInfo:UserInfoResponseModel;
  // public accessClients:Array<ClientForSelectResponseModel>;
  public isEditChanged: boolean;
  public isJumpStep:boolean;
  public Tabs:string = "";
  public isOffline:boolean=false;
  // subHeader = new BehaviorSubject<EquipmentSubHeader>(null);
  photoAdded = new BehaviorSubject<boolean>(true);
  resetSubHeader = new BehaviorSubject<boolean>(true);
  tipClosing = new BehaviorSubject<string>("");
  constructor() { }
  clearMode(){
    this.Mode = "";
  }
}

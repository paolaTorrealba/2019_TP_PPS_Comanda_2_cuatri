import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/classes/table';
import { CameraService } from 'src/app/services/camera.service';
import { TableService } from 'src/app/services/table.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-modify-table',
  templateUrl: './modify-table.component.html',
  styleUrls: ['./modify-table.component.scss'],
})
export class ModifyTableComponent implements OnInit {
  private currentTable:Table;
  private id;
  dinerQuantityModel;
  typeModel;
  photoModel = "";

  constructor(
    private cameraService: CameraService,
    private tableService: TableService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadingService.showLoading("Espere..");
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tableService.getTableById(this.id).then(tableData => {
            
        this.currentTable = Object.assign(new Table, tableData.data());
        this.loadingService.closeLoading();       
        this.typeModel=this.currentTable.type;
        this.dinerQuantityModel=this.currentTable.dinerQuantity;
        this.photoModel=this.currentTable.photo;
    })
  }

  modify(){    
   this.tableService.updateTable('mesas',this.id,{ 'type' : this.typeModel, 'dinerQuantity': this.dinerQuantityModel , 'photo' : this.photoModel }).then(() => {
      this.notificationService.presentToast("Mesa modificada", "success", "top");
      this.tableService.getTableById(this.currentTable.id.toString()).then(table => {
        this.currentTable = Object.assign(new Table, table.data());
      })
      this.router.navigateByUrl('/listado/mesas');
    });    
  
  }  
 
  takePhoto(){
    this.cameraService.takePhoto('mesas', Date.now());
  } 
}

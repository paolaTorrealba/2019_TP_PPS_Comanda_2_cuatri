import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/classes/table';
import { TableService } from 'src/app/services/table.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.page.html',
  styleUrls: ['./table-list.page.scss'],
})
export class TableListPage implements OnInit {

  private tables: Array<Table>;

  constructor(
    private tableService: TableService,
    private router: Router,
    private notificationService: NotificationService,
  ) { 
    this.tableService.getAllTables('mesas').subscribe(tables => {
      this.tables = new Array<Table>();
      tables.forEach(document => {
        const table = document.payload.doc.data() as Table;
        table.id = document.payload.doc.id;
        this.tables.push(table); 
      })
    });
  }

  ngOnInit() {
  }

  deleteTable(table){
    this.tableService.deleteTable(table.id);
  }

  modifyTable(table){   
    this.router.navigateByUrl('/modificar/mesa/'+ table.id);
  }    
  

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-wait-list',
  templateUrl: './wait-list.page.html',
  styleUrls: ['./wait-list.page.scss'],
})
export class WaitListPage implements OnInit {

  users:Array<Object>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers('listaDeEspera').subscribe(clients => {
      this.users = new Array<Object>();
      clients.forEach(user => {
        this.users.push(user);
      })
      this.users.sort((a:any,b:any) => (a.date > b.date) ? -1 : 1);
    });
  }

  takeOrder(){
    console.log("Orden tomada");
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-wait-list',
  templateUrl: './wait-list.page.html',
  styleUrls: ['./wait-list.page.scss'],
})
export class WaitListPage implements OnInit {

  users:Array<User>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAll('listaDeEspera').subscribe(users => {
      this.users = new Array<User>();
      users.forEach((user:User) => {
        if(user.profile != null && user.profile == "cliente")
          this.users.push(user);
      })
    });
  }

}

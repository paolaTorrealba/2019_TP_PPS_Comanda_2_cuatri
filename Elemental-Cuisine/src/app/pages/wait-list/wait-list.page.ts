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
    this.userService.getAllDocuments('listaDeEspera').subscribe(clients => {
      clients.docs.map(doc => doc.id).forEach(userId => {
        this.users = new Array<User>();
        this.userService.getUser(userId).then(user => {
          this.users.push(Object.assign(new User, user.data()));
        });
      })
    });
  }


}

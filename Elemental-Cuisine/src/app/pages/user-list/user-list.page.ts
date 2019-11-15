import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users:Array<User>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = new Array<User>();
      users.forEach((user:User) => {
        if(user.profile != null && user.profile != "cliente")
          this.users.push(user);
      })
    });
  }

  addEmployee(){

  }

  modifyEmployee(user){

  }

  deleteEmployee(user){
    
  }
}

import { Component, OnInit } from '@angular/core';
import { PollEmployee } from 'src/app/classes/pollEmployee';
import { PollService } from 'src/app/services/poll.service';


@Component({
  selector: 'app-poll-employee-list',
  templateUrl: './poll-employee-list.page.html',
  styleUrls: ['./poll-employee-list.page.scss'],
})
export class PollEmployeeListPage implements OnInit {
  private polls: Array<PollEmployee>;

  constructor(private pollService: PollService) { 

    this.pollService.getAllPollsEmployee('encuestas_empleados').subscribe(polls => {
      this.polls = new Array<PollEmployee>();
      console.log(this.polls);
      polls.forEach(document => {
        const poll = document.payload.doc.data() as PollEmployee;
        poll.id = document.payload.doc.id;
        this.polls.push(poll); 
      })
    });

  }

  ngOnInit() {
  }

  deletePoll(poll){
    this.pollService.deletePollEmployee(poll.id);
  }

  modifyPoll(poll){
    
  }

}

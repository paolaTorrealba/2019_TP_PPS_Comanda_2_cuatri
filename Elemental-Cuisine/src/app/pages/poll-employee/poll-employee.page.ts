import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/classes/poll';
import { PollService } from 'src/app/services/poll.service';


@Component({
  selector: 'app-poll-employee',
  templateUrl: './poll-employee.page.html',
  styleUrls: ['./poll-employee.page.scss'],
})
export class PollEmployeePage implements OnInit {
  private polls: Array<Poll>;

  constructor(
    private pollService: PollService) { 
    this.pollService.getAllPollsEmployee('encuestas_empleados').subscribe(polls => {
      this.polls = new Array<Poll>();
      console.log(this.polls);
      polls.forEach(document => {
        const poll = document.payload.doc.data() as Poll;
        poll.id = document.payload.doc.id;
        this.polls.push(poll); 
      })
    });
    console.log(this.polls);
  }

  ngOnInit() {
  }

  deletePoll(poll){
    this.pollService.deletePollEmployee(poll.id);
  }

  modifyPoll(poll){
    
  }

}

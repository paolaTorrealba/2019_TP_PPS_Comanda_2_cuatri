import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/classes/poll';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-client',
  templateUrl: './poll-client.page.html',
  styleUrls: ['./poll-client.page.scss'],
})
export class PollClientPage implements OnInit {
  private polls: Array<Poll>;

  constructor(
    private pollService: PollService) { 
    this.pollService.getAllPollsClient('encuestas_clientes').subscribe(polls => {
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
    this.pollService.deletePollClient(poll.id);
  }

  modifyPoll(poll){
    
  }

}

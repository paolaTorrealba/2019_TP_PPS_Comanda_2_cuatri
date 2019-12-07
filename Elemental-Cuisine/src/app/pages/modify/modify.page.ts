import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {
  private object;
  private id;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.object = this.activatedRoute.snapshot.paramMap.get('object');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }


}

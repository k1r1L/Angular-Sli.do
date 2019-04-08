import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../shared/models/question.model';

@Component({
  selector: 'app-event-question',
  templateUrl: './event-question.component.html',
  styleUrls: ['./event-question.component.css']
})
export class EventQuestionComponent implements OnInit {
  @Input() questionInfo: Question;
  
  constructor() { }

  ngOnInit() {
  }

}

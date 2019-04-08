import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  joinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.joinForm = this.fb.group({
      eventCode: [ null, Validators.required ]
    });
  }

  enterEvent() {
    const eventCode = this.joinForm.value.eventCode;
    this.eventService.fetchEventByCode(eventCode);
  }

}

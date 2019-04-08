import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  expirationDate = new Date();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.expirationDate.setMonth(this.expirationDate.getMonth() + 3);
    this.createForm = this.fb.group({
      code: [ null, [ Validators.required, Validators.minLength(3) ] ],
      expiresOn: [ null, Validators.required ]
    });
  }

  ngOnDestroy() {
    console.log('sdfsdf')
    this.createForm.reset();
  }

  createEvent() {
    const { code, expiresOn } = this.createForm.value;

    this.eventService.addEvent({ code, expiresOn, createdOn: new Date() });
  }
}

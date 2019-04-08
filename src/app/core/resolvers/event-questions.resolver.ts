import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Question } from 'src/app/components/shared/models/question.model';
import { Injectable } from '@angular/core';
import { EventService } from '../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventQuestionsResolver implements Resolve<Question[]> {

  constructor(
    private eventService: EventService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];

    this.eventService.fetchQuestsionsForEvent(id);
    return this.eventService.questionsChanged;
  }

}
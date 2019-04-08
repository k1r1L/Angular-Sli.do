import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SlidoEvent } from 'src/app/components/shared/models/live-event.model';
import { Question } from 'src/app/components/shared/models/question.model';
import { CreateSlidoEvent } from 'src/app/components/shared/models/create-event.model';
import { ListSlidoEvent } from 'src/app/components/shared/models/list-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _liveEvent: SlidoEvent;
  private _questionsForEvent: Question[] = [];
  private _allEvents: ListSlidoEvent[] = [];
  private _eventSubscriptions: Subscription[] = [];

  liveEventChanged = new Subject<SlidoEvent>();
  questionsChanged = new Subject<Question[]>();
  allEventsChanged = new Subject<ListSlidoEvent[]>();

  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  fetchEventByCode(eventCode: string) {
    this._eventSubscriptions.push(this.afDb
      .collection<SlidoEvent>('events',
        (ref) => ref.where('code', '==', eventCode).limit(1))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((events) => {
        if (events.length > 0) {
          this._liveEvent = events[0];
          this.liveEventChanged.next({ ...this._liveEvent });
          this.router.navigate(['/event', this._liveEvent.id, 'live']);
        } else {
          this.snackbar.open('No such event exists!', 'Close', {
            duration: 3000
          });
        }
      })
    )
  }

  fetchAllEvents() {
    this._eventSubscriptions.push(this.afDb.collection<ListSlidoEvent>('events')
      .valueChanges()
      .subscribe((events) => {
        this._allEvents = events;
        this.allEventsChanged.next([...this._allEvents]);
      }));
  }

  fetchQuestsionsForEvent(eventId: string) {
    this._eventSubscriptions.push(this.afDb.collection<Question>('questions', (ref) => ref
      .where('eventId', '==', eventId)
      .orderBy('createdOn', 'asc'))
      .valueChanges()
      .subscribe((questions) => {
        this._questionsForEvent = questions;
        this.questionsChanged.next([...this._questionsForEvent]);
      })
    )
  }

  addQuestion(payload: Question) {
    this.afDb.collection<Question>('questions').add(payload)
      .then((data) => {
        this.fetchQuestsionsForEvent(payload.eventId);
        this.snackbar.open('Question added!', 'Undo', {
          duration: 2000
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addEvent(payload: CreateSlidoEvent) {
    this._eventSubscriptions.push(this.afDb.collection('events', (ref) => ref.where('code', '==', payload.code))
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.snackbar.open(`Sli.do event with code: ${payload.code} already exists!`, 'Undo', {
            duration: 2000
          });
        } else {
          this.afDb.collection<CreateSlidoEvent>('events').add(payload)
            .then((data) => {
              this.snackbar.open(`Sli.do event: ${payload.code} created!`, 'Undo', {
                duration: 2000
              });
              this.router.navigate(['/']);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }))
  }

  cancelSubscriptions() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
  }
}
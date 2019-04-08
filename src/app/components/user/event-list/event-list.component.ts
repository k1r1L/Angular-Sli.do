import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { ListSlidoEvent } from '../../shared/models/list-event.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [ 'code', 'createdOn', 'expiresOn' ];
  dataSource = new MatTableDataSource<ListSlidoEvent>();
  allEventsSubscription: Subscription;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.fetchAllEvents();
    this.allEventsSubscription = this.eventService.allEventsChanged.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.allEventsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

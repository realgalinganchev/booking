import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Injectable()
export class EventsDetailsResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      const eventId = route.paramMap.get('id');
      this.firebaseService.getEvent(eventId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}

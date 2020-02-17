import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Injectable()
export class VenuesDetailsResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      const venueId = route.paramMap.get('id');
      this.firebaseService.getVenue(venueId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}

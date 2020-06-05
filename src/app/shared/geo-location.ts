import { Observable, of } from 'rxjs';

const DEFAULT_LATITUDE = 48.23261;
const DEFAULT_LONGITUDE = 48.23261;

export class GPSLocation {
  latitude = DEFAULT_LATITUDE;
  longitude = DEFAULT_LONGITUDE;
}

export class GeoLocationService {

  /**
   * Get browser location or return default one
   * @returns {Observable<GPSLocation>}
   */
  getLocation(): Observable<GPSLocation> {
    if (navigator.geolocation) {
      return new Observable<GPSLocation>(observer => {
        navigator.geolocation.getCurrentPosition(pos => {
          observer.next(pos.coords);
          observer.complete();
        }, () => {
          observer.next(new GPSLocation());
          observer.complete();
        });
      });
    }
    return of(new GPSLocation());
  }
}

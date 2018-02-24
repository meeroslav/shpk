import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class ApiService {
  get(url: string, params?: any): Observable<any> {
    return of(void 0);
  }
}

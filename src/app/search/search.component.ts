import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GPSLocation, ISearchModel, SearchCategory, SearchModel, SearchSortBy } from './search.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @Output() result: EventEmitter<Partial<ISearchModel>>;
  @Input('search') inputModel: Partial<ISearchModel>;

  protected searchForm: FormGroup;
  protected showDetails: boolean;

  protected allCategories = Object.keys(SearchCategory).map(c => SearchCategory[c]);
  protected allSortTypes = Object.keys(SearchSortBy).map(s => SearchSortBy[s]);

  private location: GPSLocation;

  constructor(private formBuilder: FormBuilder) {
    this.result = new EventEmitter<Partial<ISearchModel>>();
  }

  ngOnInit() {
    this.getLocation().subscribe((location: GPSLocation) => {
      this.location = location;

      const model = this.inputModel || new SearchModel(location.latitude, location.longitude);
      this.initializeForm(model);
      this.setFormListeners();
    });
  }

  onSubmit() {
    const formValue = this.searchForm.value;
    this.showDetails = false;

    this.result.next(formValue);
  }

  markerDragEnd(event: { coords: { lat: number, lng: number } }) {
    console.log(event);
    this.searchForm.controls.longitude.setValue(event.coords.lng);
    this.searchForm.controls.latitude.setValue(event.coords.lat);
  }

  private initializeForm(model: Partial<ISearchModel>) {
    this.searchForm = this.formBuilder.group({
      search: [model.search],
      listedIn: [model.listedIn],
      sortBy: [model.sortBy],
      categories: this.formBuilder.group(
        Object.assign({},
          // generate controls from all categories
          ...Object.keys(SearchCategory).map(c => ({
            [c]: [this.getCategoryValue(SearchCategory[c], model.categories || [])]
          })))
      ),
      radius: [model.radius],
      onlyMyCountry: [model.onlyMyCountry],
      latitude: [model.latitude],
      longitude: [model.longitude],
      minPrice: [model.minPrice],
      maxPrice: [model.maxPrice]
    });
  }

  private setFormListeners() {
    this.searchForm.controls.search.valueChanges.subscribe(e => {
      this.showDetails = true;
    });
  }

  /**
   * Get browser location or return default one
   * @returns {Observable<GPSLocation>}
   */
  private getLocation(): Observable<GPSLocation> {
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

  /**
   * Returns true if category is in array of categories
   * Returns true if category is 'All' and no categories are passed
   * @param {SearchCategory} category
   * @param {SearchCategory[]} categories
   * @returns {boolean}
   */
  private getCategoryValue(category: SearchCategory, categories: SearchCategory[]): boolean {
    if (categories.length) {
      return categories.indexOf(category) !== -1;
    }
    return category === SearchCategory.All;
  }
}

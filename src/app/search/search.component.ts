import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GPSLocation, ISearchModel, SearchCategory, SearchListedIn, SearchListenInLast, SearchModel, SearchRadius,
  SearchSortBy
} from './search.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @Output() result: EventEmitter<Partial<ISearchModel>>;
  @Input() inputModel: Partial<ISearchModel>;

  protected searchForm: FormGroup;
  protected showDetails: boolean;

  protected allCategories = Object.keys(SearchCategory).map(c => SearchCategory[c]);
  protected sortType = SearchSortBy;
  protected listedInMax = Object.keys(SearchListedIn).length - 1;
  protected listedInArray = SearchListenInLast;
  protected radiusMax = SearchRadius.length - 1;
  protected radiusArray = SearchRadius;
  protected zoom: number;

  private location: GPSLocation;
  private defaultModel: Partial<ISearchModel>;

  constructor(private formBuilder: FormBuilder) {
    this.result = new EventEmitter<Partial<ISearchModel>>();
  }

  ngOnInit() {
    this.getLocation().subscribe((location: GPSLocation) => {
      this.location = location;
      this.defaultModel = new SearchModel(location.latitude, location.longitude);

      const model = this.inputModel || this.defaultModel;
      this.initializeForm(model);
      this.setFormListeners();
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const selectedCategories = Object
        .keys(formValue.categories)
        .filter(key => formValue.categories[key]);

      const result = {
        ...formValue,
        ...{ listedIn: SearchListenInLast[formValue.listedIn] },
        ...{ radius: SearchRadius[formValue.radius] || 'Everywhere' },
        ...{ categories: selectedCategories }
      };

      // send it to parent component
      this.result.next(result);
      // tslint:disable-next-line
      console.log('Full form: ', result);
      // tslint:disable-next-line
      console.log('Delta for url/api:', {
        ...this.getObjectDelta(this.defaultModel, result),
        ...{ latitude: result.latitude, longitude: result.longitude }
      });

      // hide details
      this.showDetails = false;
    }
  }

  markerDragEnd(event: { coords: { lat: number, lng: number } }) {
    this.searchForm.controls.longitude.setValue(event.coords.lng);
    this.searchForm.controls.latitude.setValue(event.coords.lat);
  }

  private initializeForm(model: Partial<ISearchModel>) {
    this.searchForm = this.formBuilder.group({
      search: [model.search],
      listedIn: [SearchListenInLast.indexOf(model.listedIn)],
      sortBy: [model.sortBy],
      categories: this.formBuilder.group(
        Object.assign({},
          // generate controls from all categories
          ...Object.keys(SearchCategory).map(c => ({
            [c]: [this.getCategoryValue(SearchCategory[c], model.categories || [])]
          })))
      ),
      radius: [SearchRadius.indexOf(model.radius)],
      onlyMyCountry: [model.onlyMyCountry],
      latitude: [model.latitude],
      longitude: [model.longitude],
      minPrice: [model.minPrice, Validators.min(0)],
      maxPrice: [model.maxPrice, Validators.min(0)]
    });
    this.zoom = this.calculateZoom(model.radius);
  }

  private getObjectDelta<T>(src: T, dest: T): Partial<T> {
    const delta: Partial<T> = {};

    for (const prop in src) {
      if (src.hasOwnProperty(prop) &&
        src[prop].toString() !== dest[prop].toString() ) {
        delta[prop] = dest[prop];
      }
    }

    return delta;
  }

  private calculateZoom(radius: number): number {
    if (!radius) {
      return 3;
    }
    let zoom = 12;
    let step = 1.25;
    while (step < radius) {
      step = step * 2;
      zoom--;
    }
    return zoom;
  }

  private setFormListeners() {
    // pull down search details on search input change
    this.searchForm.controls.search.valueChanges.subscribe(() => {
      this.showDetails = true;
    });

    // calculate new zoom on radius change
    this.searchForm.controls.radius.valueChanges.subscribe(val => {
      this.zoom = this.calculateZoom(SearchRadius[val]);
    });

    this.setCategoryValueChangeListeners();
  }

  private setCategoryValueChangeListeners() {
    const categoryControls = this.searchForm.controls.categories['controls'];
    Object.keys(categoryControls)
      .forEach(key => {
        categoryControls[key].valueChanges.subscribe(value => {
          if (value) {
            if (key === SearchCategory.All) {
              // deselect all others
              Object.keys(categoryControls)
                .filter(k => k !== SearchCategory.All)
                .forEach(k => categoryControls[k].setValue(false));
            } else {
              // deselect 'All'
              categoryControls[SearchCategory.All].setValue(false);
            }
          } else {
            // none is selected -> select All
            if (Object.keys(categoryControls)
                .reduce((acc, cur) => acc + +categoryControls[cur].value, 0) === 0) {
              // select 'All'
              categoryControls[SearchCategory.All].setValue(true);
            }
          }
        });
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

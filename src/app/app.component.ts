import { Component } from '@angular/core';
import { ISearchModel } from './search/search.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  results: string;
  currentSearch: Partial<ISearchModel>;

  constructor(translate: TranslateService) {
    // load the translation resource file
    translate.setDefaultLang('en');
    translate.use('en');
  }

  getResult(payload: Partial<ISearchModel>) {
    this.results = JSON.stringify(payload, null, 2);
  }
}

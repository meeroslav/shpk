import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1pHAjoFsuqlZxmPOXMOhrWXfzyqrvr8E'
    })
  ]
})
export class SearchModule { }

import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { MatCheckboxModule, MatRadioModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1pHAjoFsuqlZxmPOXMOhrWXfzyqrvr8E'
    })
  ]
})
export class SearchModule { }

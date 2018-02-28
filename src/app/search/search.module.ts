import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import {
  MatCheckboxModule, MatProgressSpinnerModule, MatRadioModule, MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1pHAjoFsuqlZxmPOXMOhrWXfzyqrvr8E'
    })
  ]
})
export class SearchModule { }

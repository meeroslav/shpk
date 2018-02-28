import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { GeoLocationService } from './geo-location';
import { HelperService } from './helper.service';

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        GeoLocationService,
        HelperService
      ]
    };
  }
}

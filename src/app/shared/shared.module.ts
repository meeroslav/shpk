import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './api.service';

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService
      ]
    };
  }
}

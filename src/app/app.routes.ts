import { Routes } from '@angular/router';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { AddEditSponsorComponent } from './sponsors/add-edit-sponsor/add-edit-sponsor.component';

export const routes: Routes = [
       {
              path: '',
              pathMatch: 'prefix',
              component: SponsorsComponent
       },
       {
              path: 'add',
              component: AddEditSponsorComponent
       }
];

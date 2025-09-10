import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InnerPageComponent } from './inner-page/inner-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'innerPage',component: InnerPageComponent },
  { path: 'login', component: LoginComponent }

];

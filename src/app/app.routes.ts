import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InnerPageComponent } from './inner-page/inner-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CheckComponent } from './check/check.component';
import { ChartComponent } from './chart/chart.component';
import { ListEditComponent } from './admin/list-edit/list-edit.component';
import { QuesNameEditComponent } from './admin/ques-name-edit/ques-name-edit.component';
import { CkeckEditComponent } from './admin/ckeck-edit/ckeck-edit.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';



export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'innerPage',component: InnerPageComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'check', component: CheckComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'listEdit', component: ListEditComponent },
  { path: 'quesNameEdit', component: QuesNameEditComponent },
  { path: 'checkEdit',component: CkeckEditComponent },
  { path: 'feedback',component: FeedbackComponent },
  { path: 'userDetails', component: UserDetailsComponent },
  { path: '',redirectTo: '/loginPage', pathMatch: 'full' }
];


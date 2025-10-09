import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SingleQuesComponent } from '../../@component/single-ques/single-ques.component';
import { QuesDataService } from '../../@services/ques-data.service';
import { TextQuesComponent } from '../../@component/text-ques/text-ques.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ques-name-edit',
  imports: [
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SingleQuesComponent,
    TextQuesComponent,
    MatIconModule
  ],
  templateUrl: './ques-name-edit.component.html',
  styleUrl: './ques-name-edit.component.scss'
})
export class QuesNameEditComponent {

  constructor(
    private quesDataService: QuesDataService,
    private router: Router
  ) {}

  quesEdit!:Number;
  quesName!: string;
  quesDescription!: string;
  sDate!: string;
  eDate!: string;
  isLinear = false;

  page(res:number) {
    this.quesEdit = res;
  }

  checkPage() {
    this.router.navigateByUrl('/checkEdit');
  }
}

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-single-ques',
  imports:  [
    MatSlideToggleModule,
    MatIconModule
   ],
  templateUrl: './single-ques.component.html',
  styleUrl: './single-ques.component.scss'
})
export class SingleQuesComponent {

}

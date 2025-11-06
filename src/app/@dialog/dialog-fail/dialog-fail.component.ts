import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSendComponent } from '../dialog-send/dialog-send.component';

@Component({
  selector: 'app-dialog-fail',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-fail.component.html',
  styleUrl: './dialog-fail.component.scss'
})
export class DialogFailComponent {

  readonly dialogRef = inject(MatDialogRef<DialogSendComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private router: Router) { }


  onClick() {
    this.dialogRef.close();
    this.router.navigateByUrl('/loginPage');
  }
}

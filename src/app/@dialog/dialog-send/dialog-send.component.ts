import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-send',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-send.component.html',
  styleUrl: './dialog-send.component.scss'
})
export class DialogSendComponent {

  readonly dialogRef = inject(MatDialogRef<DialogSendComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor( private router: Router) {}


  onClick() {
    this.dialogRef.close();
    this.router.navigateByUrl('/list');
  }
}

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-sign-in',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-sign-in.component.html',
  styleUrl: './dialog-sign-in.component.scss'
})
export class DialogSignInComponent {

  readonly dialogRef = inject(MatDialogRef<DialogSignInComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor( private router: Router) {}


  onClick() {
    this.dialogRef.close();
    window.location.href = '/loginPage';
  }

}

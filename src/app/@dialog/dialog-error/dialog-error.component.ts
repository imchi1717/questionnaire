import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-error',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-error.component.html',
  styleUrl: './dialog-error.component.scss'
})
export class DialogErrorComponent {

  readonly dialogRef = inject(MatDialogRef<DialogErrorComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private router: Router) { }


  onClick() {
    this.dialogRef.close();
  }
}

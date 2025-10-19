import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-required',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-required.component.html',
  styleUrl: './dialog-required.component.scss'
})
export class DialogRequiredComponent {
  readonly dialogRef = inject(MatDialogRef<DialogRequiredComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private router: Router) { }

  onClick() {
    this.dialogRef.close();
  }

}

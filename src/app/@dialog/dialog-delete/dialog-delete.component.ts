import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSendComponent } from '../dialog-send/dialog-send.component';

@Component({
  selector: 'app-dialog-delete',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,

  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DialogSendComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private router: Router) { }


  cancel() {
    this.dialogRef.close();
    this.router.navigateByUrl('/quesEdit');
  }

  confirm() {
    this.dialogRef.close();

  }
}

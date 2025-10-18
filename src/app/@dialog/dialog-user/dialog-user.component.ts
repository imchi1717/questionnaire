import { Router } from '@angular/router';
import { QuesDataService } from './../../@services/ques-data.service';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss'
})
export class DialogUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogUserComponent>);
  readonly data = inject<any> (MAT_DIALOG_DATA);

  userData = {
    name: '',
    phone: '',
    email: '',
    age: ''
  };

  constructor(
    private router: Router,
    private quesDataService: QuesDataService) {}


  ngOnInit(): void {
    // 從service抓user資訊於此頁面
    this.userData = this.quesDataService.userData;
  }

  // 個人資料的dialog
  onClick() {
    this.dialogRef.close();
    this.router.navigateByUrl('/list');
  }
}

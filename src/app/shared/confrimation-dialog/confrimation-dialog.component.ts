import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confrimation-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: './confrimation-dialog.component.html',
  styleUrl: './confrimation-dialog.component.scss',
})
export class ConfrimationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfrimationDialogComponent>) {}

  /**
   * Close dialoug
   * @param {boolean} isDeleteUser
   * @memberof ConfrimationDialogComponent
   */
  closeDialoug(isDeleteUser: boolean) {
    this.dialogRef.close(isDeleteUser);
  }
}

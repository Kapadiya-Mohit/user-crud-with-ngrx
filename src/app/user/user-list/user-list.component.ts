import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfrimationDialogComponent } from '../../shared/confrimation-dialog/confrimation-dialog.component';
import { User } from '../../model/user.model';
import { Store } from '@ngrx/store';
import { getUser } from '../../state/user.selector';
import { Observable } from 'rxjs';
import { deleteUser } from '../../state/user.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  user$!: Observable<User[]>;
  users!: User[];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'contact',
    'action',
  ];
  dataSource: User[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
    this.user$.subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource = this.users;
      },
      error: (err) => console.log(err),
    });
  }

  /**
   *
   * Go to add user
   * @memberof UserListComponent
   */
  goToAddUser(): void {
    this.router.navigate(['/add']);
  }

  goToEditUser(user: User): void {
    this.router.navigate(['/add', user.id]);
  }

  /**
   * Delete user based on user confirmation
   * @returns{*} {void}
   * @memberof UserListComponent
   */
  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfrimationDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(deleteUser({ id: user.id }));
        this.toast.success('User deleted successfully!', 'Success', {
          timeOut: 1000,
        });
      }
    });
  }
}

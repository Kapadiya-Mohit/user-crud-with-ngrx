import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addUser, updateUser } from '../../state/user.action';
import { User } from '../../model/user.model';
import { getUserById } from '../../state/user.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.route.params.subscribe((res) => {
      if (res['id']) {
        this.userId = res['id'];
        this.store.select(getUserById, { id: +this.userId }).subscribe({
          next: (user) => {
            if (user) {
              this.user = user;
              this.patchUserValue(user);
            }
          },
          error: (err) => console.log(err),
        });
      }
    });
  }

  /**
   * Patch user form value
   * @param {User} user
   * @memberof UpdateUserComponent
   */
  patchUserValue(user: User): void {
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contact: user.contact,
      password: user.password,
    });
  }

  /**
   *
   *Initialization of user form
   * @memberof UpdateUserComponent
   */
  initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   *
   *Save user form
   * @memberof UpdateUserComponent
   */
  saveUser(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
    if (this.userId) {
      this.store.dispatch(
        updateUser({ ...this.userForm.value, id: this.user.id })
      );
      this.toast.success('User updated successfully!', 'Success', {
        timeOut: 1000,
      });
      this.router.navigate(['/']);
    } else {
      const userId = Math.floor(Math.random() * 100);
      const user: User = { ...this.userForm.value, id: userId };
      this.store.dispatch(addUser({ user }));
      this.toast.success('User added successfully!', 'Success', {
        timeOut: 1000,
      });
      this.router.navigate(['/']);
    }
  }

  /**
   *
   * Cancel add user
   * @memberof UpdateUserComponent
   */
  cancelAddUser(): void {
    this.router.navigate(['/']);
  }

  /**
   * Return true if any error occur, otherwise false
   * @param {string} control
   * @param {string} errorName
   * @memberof UpdateUserComponent
   */
  hasError(control: string, errorName: string) {
    return this.userForm.get(control)?.hasError(errorName);
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user/user-list/user-list.component').then(
        (a) => a.UserListComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./user/update-user/update-user.component').then(
        (a) => a.UpdateUserComponent
      ),
  },
  {
    path: 'add/:id',
    loadComponent: () =>
      import('./user/update-user/update-user.component').then(
        (a) => a.UpdateUserComponent
      ),
  },
];

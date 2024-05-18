import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const ADD_USER_ACTION = '[user page] Add user';
export const UPDATE_USER_ACTION = '[user page] Update user';
export const DELETE_USER_ACTION = '[user page] Delete user';

export const addUser = createAction(ADD_USER_ACTION, props<{ user: User }>());

export const updateUser = createAction(
  UPDATE_USER_ACTION,
  props<{ user: User }>()
);

export const deleteUser = createAction(
  DELETE_USER_ACTION,
  props<{ id: number }>()
);

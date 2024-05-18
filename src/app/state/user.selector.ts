import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { User } from '../model/user.model';

const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(getUserState, (state) => {
  return state.users;
});

export const getUserById = createSelector(
  getUserState,
  (state: UserState, props: { id: number }) => {
    return state.users.find((user: User) => user.id === props.id);
  }
);

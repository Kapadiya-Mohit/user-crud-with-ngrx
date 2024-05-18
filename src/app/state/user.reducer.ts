import { createReducer, on, Action } from '@ngrx/store';
import { UserState, initialState } from './user.state';
import { addUser, deleteUser, updateUser } from './user.action';
import { User } from '../model/user.model';

const _userReducer = createReducer(
  initialState,

  // Add user reducer
  on(addUser, (state, action) => {
    let user = { ...action.user };
    return {
      state,
      users: [...state.users, user],
    };
  }),

  // update user reducer
  on(updateUser, (state: any, action: any) => {
    let updatedUser = state.users.map((user: User) => {
      return action.id === user.id ? action : user;
    });
    return {
      state,
      users: updatedUser,
    };
  }),

  // delete user reducer
  on(deleteUser, (state, action) => {
    let updatedUser = state.users.filter((user: User) => {
      return action.id != user.id;
    });
    return {
      state,
      users: updatedUser,
    };
  })
);

export function userReducer(state: any, action: Action) {
  return _userReducer(state, action);
}

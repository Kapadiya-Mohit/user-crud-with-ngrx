import { User } from '../model/user.model';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: [],
};

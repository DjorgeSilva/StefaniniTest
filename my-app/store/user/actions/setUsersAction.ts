import { ACTIONS_REDUX } from "../../../constants";
import { UserType } from "../../../types";

export type PayloadType = {
  users: UserType[];
};

export function setUsersAction(payload: PayloadType) {
  return {
    type: ACTIONS_REDUX.SET_USER,
    payload: payload.users,
  };
}

export type SetUserPayloadType = {
  currentUser: UserType;
};

export function setCurrentUser(payload: SetUserPayloadType) {
  return {
    type: ACTIONS_REDUX.SET_CURRENT_USER,
    payload: payload.currentUser,
  };
}

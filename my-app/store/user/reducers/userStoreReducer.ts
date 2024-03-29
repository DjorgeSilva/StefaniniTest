import { ACTIONS_REDUX } from "../../../constants";
import { UserType } from "../../../types";

type GetUserActionType = {
  type: string;
  payload: {
    users: UserType[];
  };
};

const initialState = {
  currentUser: {},
  userList: [],
};

const userStoreReducer = (state = initialState, action: GetUserActionType) => {
  switch (action.type) {
    case ACTIONS_REDUX.SET_USER:
      return {
        ...state,
        userList: action.payload,
      };
    case ACTIONS_REDUX.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
export default userStoreReducer;

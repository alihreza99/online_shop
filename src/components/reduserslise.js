import { Userdatas } from "../data";
const initState = {
  entities: Userdatas,
  admin: null,
  shopitems:[]
};

export default function sign_auth(state = initState, action) {
  switch (action.type) {
    case "sign":
      const user = action.payload;
      return {
        ...state,
        entities: [...state.entities, user],
        admin: user,
      };
    case "log":
      const login = action.payload;
      return {
        ...state,
        admin: login,
      };
    case "logout":
      return {
        ...state,
        admin: null,
      };
    case "delete":
      const deleteduserId = action.payload;
      return {
        ...state,
        entities: state.entities.filter((user) => user.id !== deleteduserId),
      };
    case "add":
      const item = action.payload;
      return {
        ...state,
        shopitems: [...state.shopitems, item],
      }
    case "deleteitem":
      const deleteit = action.payload;
      return {
        ...state,
        shopitems: state.shopitems.filter((user) => user.id !== deleteit),
      };
    default:
      return state;
  }
}

export const selectusers = (state) => state.users.entities;

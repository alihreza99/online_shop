import { createAction, createReducer } from "@reduxjs/toolkit";
import { Userdatas } from "../services/data";
const initState = {
  entities: Userdatas,
  admin: null,
  shopitems: [],
  prices : 0,
};

const counterReducer = createReducer(initState, (builder) => {
  builder
    .addCase("sign", (state, action) => {
      const user = action.payload;
      return {
        ...state,
        entities: [...state.entities, user],
        admin: user,
      };
    })
    .addCase("log", (state, action) => {
      const login = action.payload;
      return {
        ...state,
        admin: login,
      };
    })
    .addCase("logout", (state, action) => {
      return {
        ...state,
        admin: null,
      };
    })
    .addCase("delete", (state, action) => {
      const deleteduserId = action.payload;
      return {
        ...state,
        entities: state.entities.filter((user) => user?.id !== deleteduserId),
      };
    })
    .addCase("add", (state, action) => {
      const item = action.payload;
      return {
        ...state,
        shopitems: [...state.shopitems, item],
        
      };
    })
    .addCase("deleteitem", (state, action) => {
      const deleteit = action.payload;
      return {
        ...state,
        shopitems: state.shopitems.filter((user) => user?.id !== deleteit),
      };
    })
    .addCase("plus", (state, action) => {
      const edit = action.payload;
      return {
        ...state,
        shopitems: state.shopitems.map((items) => {
          console.log(state.shopitems);
          console.log(items?.id);
          if (items?.id == edit?.fid) {
            return {
              title: items?.title,
              image: items?.image,
              price: items?.price,
              category: items?.category,
              id: items?.id,
              number: 1 + edit?.num,
            };
          }

          return items;
        }),
      };
    })
    .addCase("min", (state, action) => {
      const edit2 = action.payload;
      return {
        ...state,
        shopitems: state.shopitems.map((items) => {
          console.log(state.shopitems);
          console.log(items?.id);
          if (items?.id == edit2?.fid) {
            return {
              title: items?.title,
              image: items?.image,
              price: items?.price,
              category: items?.category,
              id: items?.id,
              number: edit2?.num - 1,
            };
          }

          return items;
        }),
      };
    })
    .addDefaultCase((state, action) => {
      state.otherActions++
    });
});


export default counterReducer;


export const selectusers = (state) => state.users.entities;

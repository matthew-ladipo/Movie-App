import { ActionType } from "./ActionType";

const inicialState = {
  product: [],
};

export const ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case ActionType.SET_PRODUCT:
      return state;

    default:
      return state;
  }
};

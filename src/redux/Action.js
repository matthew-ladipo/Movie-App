import { ActionType } from "./ActionType"

export const setProducts  = () => {
return{
    type: ActionType.SET_PRODUCT,
    payoad: products,
}
}

export const selectedProduct = (product) => {
    return{
        type: ActionType.SELECTED_PRODUCT,
        payoad:product,
    }
}
import { setToast } from "../../../utils/extraFunctions";
import { getCartTotal } from "../../../utils/getCartTotal";
import { handleCartDuplicate } from "../../../utils/handleCartDuplicate";
import { getItem, setItem } from "../../../utils/localstorage";
import { getItemSession, removeItemSession, setItemSession } from "../../../utils/sessionStorage";
import { ADD_TO_CART_SUCCESS, APPLY_COUPON_SUCCESS, REMOVE_COUPON_SUCCESS, REMOVE_FROM_CART, UPDATE_CART_DETAILS } from "./actionTypes";

export class Product {
    name; price; description; photos; category; gender; color; rating; sizes;
    constructor({
        name, price, description, photos, category, gender, color, rating, sizes
    }) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.photos = photos;
        this.category = category;
        this.gender = gender;
        this.color = color;
        this.rating = rating;
        this.sizes = sizes;
    };
}

export const addToCartSuccess = (payload) => {
    return { type: ADD_TO_CART_SUCCESS, payload };
};

export const removeFromCart = (payload) => {
    return { type: REMOVE_FROM_CART, payload };
};

export const applyCouponSuccess = (payload) => {
    return { type: APPLY_COUPON_SUCCESS, payload };
};

export const removeCouponSuccess = (payload) => {
    return { type: REMOVE_COUPON_SUCCESS, payload };
};

export const updateCartDetails = () => {
    return { type: UPDATE_CART_DETAILS };
}


export const addToCartRequest = (data, toast, operation = 'add') => (dispatch) => {
    let cartData = getItem('cartProducts') || [];
    cartData = handleCartDuplicate(cartData, data, operation);
    setItem('cartProducts', cartData);
    const discountPercent = getItemSession('discountPercent');
    const orderSummary = getCartTotal(cartData, discountPercent);
    setItem('orderSummary', orderSummary);
    dispatch(addToCartSuccess({ cartData, orderSummary }));
};

export const getCartQuantity = () => {
    let cartData = getItem('cartProducts') || [];
    return cartData.length;
}

export const removeFromCartRequest = (index, toast) => (dispatch) => {
    const cartData = getItem('cartProducts');
    cartData.splice(index, 1);
    setItem('cartProducts', cartData);
    const discountPercent = getItemSession('discountPercent');
    const orderSummary = getCartTotal(cartData, discountPercent);
    orderSummary.subTotal === 0 && removeItemSession('discountPercent');
    setItem('orderSummary', orderSummary);
    dispatch(removeFromCart({ index, orderSummary }));
    setToast(toast, 'Produto removido do carrinho', 'success');
};

export const applyCouponRequest = (discountPercent, toast) => (dispatch) => {
    const cartData = getItem('cartProducts');
    setItemSession('discountPercent', discountPercent)
    const orderSummary = getCartTotal(cartData, discountPercent);
    setItem('orderSummary', orderSummary);
    dispatch(applyCouponSuccess(orderSummary));
    setToast(toast, 'Cupom adicionado com sucesso!', 'success', 2000, `Você ganhou ${discountPercent}% de desconto`);
};

export const removeCouponRequest = (toast) => (dispatch) => {
    const cartData = getItem('cartProducts');
    removeItemSession('discountPercent');
    const orderSummary = getCartTotal(cartData, 0);
    setItem('orderSummary', orderSummary);
    dispatch(removeCouponSuccess(orderSummary));
    setToast(toast, 'Cupom removido com sucesso', 'success');
};
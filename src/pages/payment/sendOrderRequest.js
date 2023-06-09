import axios from "axios";
import { updateCartDetails } from "../../redux/features/cart/actions";
import { setToast } from "../../utils/extraFunctions";
import { removeItem } from "../../utils/localstorage";
import { print } from "../../utils/print";


export const sendOrderRequest = async (shippingDetails, orderId, response, orderSummary, cartProducts, token, toast, dispatch, navigate) => {

    const payload = {
        orderSummary,
        cartProducts,
        shippingDetails,
        paymentDetails: {
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id
        }
    };

    try {
        await axios.post('/order', payload, { headers: { 'Authorization': `Bearer ${token}` } });

        setToast(toast, 'Pedido realizado com sucesso', 'success');

        //Empty the cart
        removeItem('cartProducts');
        removeItem('orderSummary');
        dispatch(updateCartDetails());
        navigate('/orders');

    } catch (err) {
        print(err);
    }
};
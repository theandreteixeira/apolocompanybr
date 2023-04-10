import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { dateFormator } from "../../utils/dateFormator";
import { numberWithCommas } from "../../utils/extraFunctions";
import { OrderPageText } from "./OrderPageText";


export const Summary = ({ subTotal, discount, quantity, total, shipping, createdAt, orderId, razorpayPaymentId }) => {

    const { date, time } = dateFormator(createdAt);

    return (
        <>
            <Box py={'15px'} px={'25px'}>

                <Text fontSize={'20px'} fontWeight={600}>Summary</Text>

                <Divider />

                <Flex flexDirection={'column'} gap={'5px'} my={'20px'} fontSize={'18px'}>

                    <OrderPageText name={'Order Date'} value={date} />

                    <OrderPageText name={'Order Time'} value={time} />

                    <Divider my={'10px'} />

                    <OrderPageText name={'Order ID'} value={orderId} />

                    <OrderPageText name={'Payment ID'} value={razorpayPaymentId} />

                    <Divider my={'10px'} />

                    <OrderPageText name={'Subtotal'} value={`R$ ${numberWithCommas(subTotal)}`} />

                    <OrderPageText name={'Quantity'} value={quantity} />

                    <Flex justifyContent={'space-between'}>
                        <Text >Entrega</Text>
                        <Text title={'Todos os pedidos incluem frete grátis para todo o Brasil.'} cursor={'pointer'}>
                            R${numberWithCommas(shipping)}
                        </Text>
                    </Flex>

                    <OrderPageText name={'Discount'} value={`R$${numberWithCommas(discount)}`} />

                    <Divider my={'10px'} />

                    <OrderPageText name={'Total'} value={`R$${numberWithCommas(total)}`} />

                </Flex>
            </Box>
        </>
    );
};
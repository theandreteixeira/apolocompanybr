import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { dateFormator } from "../../utils/dateFormator";
import { numberWithCommas } from "../../utils/extraFunctions";
import { OrderPageText } from "./OrderPageText";


export const Summary = ({ subTotal, discount, quantity, total, shipping, createdAt, orderId }) => {

    const { date, time } = dateFormator(createdAt);

    return (
        <>
            <Box py={'15px'} px={'25px'}>

                <Text fontSize={'20px'} fontWeight={600}>Resumo</Text>

                <Divider />

                <Flex flexDirection={'column'} gap={'5px'} my={'20px'} fontSize={'18px'}>

                    <OrderPageText name={'Data do pedido'} value={date} />

                    <Divider my={'10px'} />

                    <OrderPageText name={'ID do pedido'} value={orderId} />

                    <Divider my={'10px'} />

                    <OrderPageText name={'Subtotal'} value={`R$ ${numberWithCommas(subTotal)}`} />

                    <OrderPageText name={'Quantidade'} value={quantity} />

                    <Flex justifyContent={'space-between'}>
                        <Text fontWeight={"bold"}>Entrega</Text>
                        <Text title={'Todos os pedidos incluem frete grátis para todo o Brasil.'} cursor={'pointer'}>
                            R${numberWithCommas(shipping)}
                        </Text>
                    </Flex>

                    <OrderPageText name={'Desconto'} value={`R$${numberWithCommas(discount)}`} />

                    <Divider my={'10px'} />

                    <OrderPageText name={'Total'} value={`R$${numberWithCommas(total)}`} />

                </Flex>
            </Box>
        </>
    );
};
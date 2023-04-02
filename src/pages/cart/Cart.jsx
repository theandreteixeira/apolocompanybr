import { Box, Image, Text, Center, HStack  } from "@chakra-ui/react";
import { BagItems } from "../../components/cart/BagItems";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { useSelector } from "react-redux";

export const Cart = () => {

    const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
    console.log(cartProducts)

    return (
        <>
         {cartProducts.length > 0 ?
            <Box
                display={'grid'}
                gap={['40px','40px','40px','5%','5%']}
                my={'30px'}
                maxW={'1200px'}
                mx={'auto'}
                p={'20px'}
                gridTemplateColumns={['100%', '100%', '100%', '65% 30%', '65% 30%']}
            >
                <BagItems products={cartProducts} />
                <OrderSummary />
            </Box>
                :
                <EmptyCart />
         }
        </>
    );
};

export const EmptyCart = () => {
    return (
        <>
        <HStack>
        <Box position='relative' p={'20px'}>
                <Text fontSize={'25'} fontWeight={'extrabold'}>SUA SACOLA ESTÁ VAZIA</Text>
                <Text fontSize={'20px'}>Nenhum item adicionado a sacola ainda.</Text>
        </Box>
        </HStack>
         </>);
}
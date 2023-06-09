import { Box, Image, Text, Center, Flex } from '@chakra-ui/react'
import { BagItems } from '../../components/cart/BagItems'
import { OrderSummary } from '../../components/cart/OrderSummary'
import { useSelector } from 'react-redux'
import { EmptyCart } from '../../components/cart/EmptyCart'
import { print } from '../../utils/print'

export const Cart = () => {
  const cartProducts = useSelector(state => state.cartReducer.cartProducts)
  print(cartProducts)

  return (
    <>
      {cartProducts.length > 0 ? (
        <Box
          display={'grid'}
          gap={['40px', '40px', '40px', '5%', '5%']}
          my={'30px'}
          maxW={'1200px'}
          mx={'auto'}
          p={'20px'}
          gridTemplateColumns={['100%', '100%', '100%', '65% 30%', '65% 30%']}
        >
          <BagItems products={cartProducts} />
          <OrderSummary />
        </Box>
      ) : (
        <EmptyCart />
      )}
    </>
  )
}

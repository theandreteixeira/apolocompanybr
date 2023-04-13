import { Box } from '@chakra-ui/react'
import { OrderSummaryDataSection } from '../cart/OrderSummaryDataSection'
import { PlaceOrderBtn } from './PlaceOrderBtn'

export const CheckoutOrderSummary = ({ onClick, orderSummary, isLoading }) => {
  return (
    <Box>
      <OrderSummaryDataSection {...orderSummary} />

      <PlaceOrderBtn onClick={onClick} isLoading={isLoading} />
    </Box>
  )
}

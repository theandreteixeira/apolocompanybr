import { Box } from '@chakra-ui/react'
import { OrderSummaryDataSection } from '../cart/OrderSummaryDataSection'
import { PlaceOrderBtn } from './PlaceOrderBtn'

export const CheckoutOrderSummary = ({
  onClick,
  orderSummary,
  isLoading,
  frete
}) => {
  return (
    <Box>
      <OrderSummaryDataSection {...orderSummary} frete={frete} />

      <PlaceOrderBtn onClick={onClick} isLoading={isLoading} />
    </Box>
  )
}

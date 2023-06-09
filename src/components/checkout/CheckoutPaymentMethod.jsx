import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { PaymentMethod } from './PaymentMethod'

export const CheckoutPaymentMethod = ({ handlePaymentMethod, onChange }) => {
  return (
    <>
      <Box my={'10px'}>
        <Text fontSize={'20px'} fontWeight={600} mb={'20px'}>
          Escolha um método de pagamento:
        </Text>

        <Flex gap={'20px'}>
          <PaymentMethod
            handlePaymentMethod={handlePaymentMethod}
            onChange={onChange}
          />
        </Flex>
      </Box>
    </>
  )
}

import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { OrderPageText } from './OrderPageText'

export const OrderAddress = ({
  firstName,
  lastName,
  email,
  mobile,
  addressLine1,
  addressLine2,
  city,
  state,
  pinCode,
  country
}) => {
  return (
    <Box py={'15px'} px={'25px'}>
      <Text fontSize={'20px'} fontWeight={600}>
        Entrega
      </Text>

      <Divider mb={'20px'} />

      <Flex flexDirection={'column'} gap={'5px'} my={'20px'} fontSize={'18px'}>
        <OrderPageText
          name={'Nome completo'}
          value={`${firstName} ${lastName}`}
        />

        <OrderPageText name={'Telefone'} value={`+55 ${mobile}`} />

        <OrderPageText name={'Email'} value={email} />

        <Divider my={'10px'} />

        <OrderPageText name={'Endereço'} value={addressLine1} />

        {addressLine2 && <OrderPageText name={'Número'} value={addressLine2} />}

        <OrderPageText name={'Cidade'} value={city} />

        <OrderPageText name={'Estado'} value={state} />

        <OrderPageText name={'CEP'} value={pinCode} />

        <OrderPageText name={'País'} value={country} />

        <Divider my={'10px'} />
      </Flex>
    </Box>
  )
}

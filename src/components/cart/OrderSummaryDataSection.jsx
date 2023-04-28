import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { numberWithCommas } from '../../utils/extraFunctions'

export const OrderSummaryDataSection = ({
  subTotal,
  discount,
  quantity,
  total,
  shipping,
  frete
}) => {
  return (
    <>
      <Text fontSize={'20px'} fontWeight={600}>
        Resumo
      </Text>

      <Box my={'20px'} fontSize={'18px'}>
        <Flex justifyContent={'space-between'}>
          <Text>Subtotal</Text>
          <Text>R${numberWithCommas(subTotal)}</Text>
        </Flex>

        <Flex mt={'5px'} justifyContent={'space-between'}>
          <Text>Quantidade</Text>
          <Text>{quantity}</Text>
        </Flex>

        <Flex mt={'5px'} justifyContent={'space-between'}>
          <Text>Frete</Text>
          <Text
            title={'Todos os pedidos possuem frete grátis para o Brasil todo.'}
            cursor={'pointer'}
          >
            R${numberWithCommas(frete ?? 0)}
          </Text>
        </Flex>

        <Flex mt={'5px'} justifyContent={'space-between'}>
          <Text>Desconto</Text>
          <Text>R${numberWithCommas(discount)}</Text>
        </Flex>
      </Box>

      <Divider />

      <Flex fontSize={'18px'} justifyContent={'space-between'} my={'20px'}>
        <Text fontWeight={'bold'}>Total</Text>
        {console.log('flexxx', total, frete)}
        <Text fontWeight={500}>R${numberWithCommas(total + (frete ?? 0))}</Text>
      </Flex>

      <Divider mb={'20px'} />
    </>
  )
}

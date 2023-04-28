import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { dateFormator } from '../../utils/dateFormator'
import { numberWithCommas } from '../../utils/extraFunctions'
import { OrderPageText } from './OrderPageText'

export const Summary = ({
  subTotal,
  discount,
  quantity,
  total,
  shipping,
  createdAt,
  orderId,
  status,
  id
}) => {
  const { date, time } = dateFormator(createdAt)

  const applyStatus = status => {
    switch (status) {
      case 'paid':
        return 'Pago'
      case 'failed':
        return 'Falha no pagamento'
      case 'pending':
        return 'Aguardando pagamento'
      default:
        return 'Processando pagamento'
    }
  }

  return (
    <>
      <Box py={'15px'} px={'25px'}>
        <Text fontSize={'20px'} fontWeight={600}>
          Resumo
        </Text>

        <Divider />

        <Flex
          flexDirection={'column'}
          gap={'5px'}
          my={'20px'}
          fontSize={'18px'}
        >
          <Flex justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>{'Status'}</Text>
            <Text fontWeight={500} color={status == 'failed' ? 'red' : 'green'}>
              {applyStatus(status)}
            </Text>
          </Flex>

          <Divider my={'10px'} />

          <OrderPageText name={'Data do pedido'} value={date} />

          <Divider my={'10px'} />

          <OrderPageText name={'ID do pedido'} value={id} />

          <Divider my={'10px'} />

          <OrderPageText
            name={'Subtotal'}
            value={`R$ ${numberWithCommas(subTotal)}`}
          />

          <OrderPageText name={'Quantidade'} value={quantity} />

          <Flex justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Entrega</Text>
            <Text
              title={
                'Todos os pedidos incluem frete grátis para todo o Brasil.'
              }
              cursor={'pointer'}
            >
              R${numberWithCommas(shipping)}
            </Text>
          </Flex>

          <OrderPageText
            name={'Desconto'}
            value={`R$${numberWithCommas(discount)}`}
          />

          <Divider my={'10px'} />

          <OrderPageText
            name={'Total'}
            value={`R$${numberWithCommas(total + shipping)}`}
          />
        </Flex>
      </Box>
    </>
  )
}
